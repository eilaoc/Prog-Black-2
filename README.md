# RecipeGPT

A cross-platform mobile app built with React Native and Flask that extracts structured cooking recipes directly from TikTok or Instagram Reels. Paste a video link, and RecipeGPT will transcribe the audio and generate step-by-step instructions using Whisper and Mistral.

---

## Features

- Paste a TikTok or Instagram video link and get a structured recipe.
- Clean UI with ingredients, step-by-step instructions, and cook/prep times.
- Smooth tab navigation using Expo Router.
- Backend handles video downloading, audio extraction, transcription, and parsing.
- Works fully locally with Whisper + Ollama (Mistral model).

---

## System Requirements

- A modern computer with **modern operating system**
- Stable internet connection (for pulling videos)
- **8GB RAM minimum although 16GB+ recommended** for running Whisper and Mistral locally
- Tested on MacBook M2 2022 (8 GB RAM, CPU-only mode)

---

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Prog-Black-2
```

---

## Project Structure

```
Prog-Black-2/
├── RecipeGPT-Frontend/       # React Native + Expo app
│   ├── app/                  # Screens (tabs)
│   ├── components/           # Shared UI components
│   ├── constants/            # Theme and color configs
│   ├── assets/               # Fonts and icons
│   └── ...
├── RecipeGPT-Backend/        # Flask backend with Whisper + Mistral
│   ├── app.py
│   └── requirements.txt
├── README.md
└── LICENSE
```

---

## Ollama Mistral Setup

1. Install Ollama onto your system if you haven't already from https://ollama.com

2. Pull the Mistral model by running:
```bash
ollama pull mistral
```
3. Start Ollama by either:
- Opening the Ollama app (recommended)
- Or running manually in terminal:
```bash
ollama run mistral
```
Ollama Mistral MUST be running before starting the backend server

---

## Backend Setup

1. Navigate to the backend directory:
```bash
cd RecipeGPT-Backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the backend server:
```bash
python app.py
```

---

## Frontend Setup

1. Open a new terminal window and navigate to the frontend:
```bash
cd RecipeGPT-Frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Install Expo CLI globally if not already installed:
```bash
npm install -g expo-cli
```

4. Start the app with Expo:
```bash
npx expo start
```

5. Scan the QR code using the **Camera** on your phone and open the link in **Expo Go**.

---

## Important Notes

- If the backend and frontend are on different machines or networks, update the IP in `app/(tabs)/index.tsx`:
```ts
await fetch('http://<your-local-ip>:5001/extract-recipe', ...)
```

To find your local IP:

```bash
# macOS 
ipconfig getifaddr en0

# Linux
ip a
```
```cmd
:: Windows (use Command Prompt)
ipconfig
```

- If both backend and frontend are on the same machine (like in cases of using local iOS simulators), use:
```tsx
fetch('http://localhost:5001/extract-recipe', ...)
```

---

## Technologies Used

**Frontend:**
- React Native (Expo)
- Expo Router
- TypeScript

**Backend:**
- Python + Flask
- Whisper (speech-to-text)
- yt-dlp (video downloading)
- MoviePy (audio extraction)
- Ollama (local LLM engine)
- Mistral model (AI parsing)

---

## License

This project is licensed under the MIT License.

