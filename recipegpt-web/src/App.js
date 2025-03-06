import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import RecipeScreen from './screens/RecipeScreen';


function App() {
  const [transcript, setTranscript] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);

  const handleUpload = async () => {
    const url = prompt("Enter a YouTube video URL:");
    if (!url) return;

    const response = await fetch("http://127.0.0.1:5000/extract-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    if (data.transcript) {
      setTranscript(data.transcript);
      setShowRecipe(true);
    } else {
      alert("Error: " + data.error);
    }
  };

  return showRecipe ? (
    <RecipeScreen transcript={transcript} />
  ) : (
    <HomeScreen onUpload={handleUpload} />
  );
}

export default App;
