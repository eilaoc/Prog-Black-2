import os
import subprocess
import uuid
import json
import whisper
import requests
from flask import Flask, request, jsonify
from moviepy.editor import VideoFileClip
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# download video from URL
def download_video(url):
    video_id = str(uuid.uuid4())
    filename = f"video_{video_id}.mp4"
    command = ["yt-dlp", "-f", "best[ext=mp4]", "-o", filename, url]
    subprocess.run(command, check=True)
    return filename

# extract audio from video
def extract_audio(video_path):
    audio_path = video_path.replace(".mp4", ".mp3")
    clip = VideoFileClip(video_path)
    clip.audio.write_audiofile(audio_path)
    return audio_path

# transcribe audio with Whisper
def transcribe_audio(audio_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    return result["text"]

# parse recipe with Mistral
def parse_with_mistral(transcript):
    prompt = f"""
You are a helpful assistant parsing cooking videos. You will be given a transcript.

Transcript:
{transcript}

Your task:
1. Extract a list of ingredients, even if the measurements are not explicitly stated.
   - Approximate the measurements based on what is commonly used in similar recipes.
   - Make proportional guesses based on measurements that might be mentioned in the transcript or that make sense for a typical serving size for 1-2 people.
2. Write clear, step-by-step cooking instructions with natural flowing tone, 2-3 steps per instruction.
3. Estimate the total prep and cook time.
4. Include serving size if it’s mentioned or can be reasonably inferred.

Present your output in JSON with ingredients as quantity (like with numbers or number of tbsp/tsp or "to taste", heres an example : "item": "Corn Flour","quantity": "1tbsp") and item (just the name of the item, no prep), instructions (prep can be part of this) as another section and then prep_time, cook_time, serving_size and then dish_name.
"""
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        }
    )
    return json.loads(response.json()["response"])

# recipe route
@app.route("/extract-recipe", methods=["POST"])
def extract_and_parse_recipe():
    data = request.get_json()
    video_url = data.get("url")

    try:
        video_path = download_video(video_url)
        audio_path = extract_audio(video_path)
        transcript = transcribe_audio(audio_path)
        parsed_recipe = parse_with_mistral(transcript)

        os.remove(video_path)
        os.remove(audio_path)

        return jsonify({
            "transcript": transcript,
            "parsed_recipe": parsed_recipe
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# run server
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)