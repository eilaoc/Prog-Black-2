import React from 'react';

const RecipeScreen = ({ transcript }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Transcription</h2>
        <p style={styles.text}>{transcript || "No transcript yet."}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#f4511e',
  },
  text: {
    fontSize: '16px',
    color: '#666',
    whiteSpace: 'pre-wrap',
  },
};

export default RecipeScreen;
