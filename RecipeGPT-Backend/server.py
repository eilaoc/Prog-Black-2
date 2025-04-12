import os
import subprocess
from flask import Flask, request, jsonify
from moviepy.editor import VideoFileClip
import uuid
import whisper

app = Flask(__name__)

# === HELPERS ===
def download_video(url):
    video_id = str(uuid.uuid4())
    filename = f"video_{video_id}.mp4"
    command = [
        "yt-dlp",
        "-f", "best[ext=mp4]",
        "-o", filename,
        url
    ]
    subprocess.run(command, check=True)
    return filename

def extract_audio(video_path):
    audio_path = video_path.replace(".mp4", ".mp3")
    clip = VideoFileClip(video_path)
    clip.audio.write_audiofile(audio_path)
    return audio_path

def transcribe_audio(audio_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    return result["text"]

# === ROUTES ===
@app.route("/extract-recipe", methods=["POST"])
def extract_transcript_from_video():
    data = request.get_json()
    video_url = data.get("url")

    try:
        video_path = download_video(video_url)
        audio_path = extract_audio(video_path)
        transcript = transcribe_audio(audio_path)

        # Cleanup
        os.remove(video_path)
        os.remove(audio_path)

        return jsonify({"transcript": transcript})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === MAIN ===
if __name__ == "__main__":
    app.run(debug=True)
