import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ExtractScreen() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleExtract = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.247.37.228:5001/extract-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      // Navigate using Expo Router
      router.push({
        pathname: '/recipe',
        params: {
          parsed_recipe: JSON.stringify(data.parsed_recipe),
          transcript: data.transcript,
        },
      });

    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RecipeGPT</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Paste Instagram/TikTok link"
        placeholderTextColor="#888"
        value={url}
        onChangeText={setUrl}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleExtract}
        disabled={loading || !url}
      >
        <Text style={styles.buttonText}>Extract Recipe</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6DA86F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5F965F',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});