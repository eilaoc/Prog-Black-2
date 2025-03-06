import React from 'react';

const HomeScreen = ({ onUpload }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>RecipeGPT</h1>
      <button style={styles.button} onClick={onUpload}>Upload Video</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  title: {
    fontSize: '36px',
    color: '#333',
  },
  button: {
    backgroundColor: '#f4511e',
    color: '#fff',
    padding: '15px 30px',
    fontSize: '18px',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default HomeScreen;
