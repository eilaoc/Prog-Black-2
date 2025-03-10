import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

const RecipeCard = styled.View`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const RecipeTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #f4511e;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  font-size: 16px;
  color: #666;
  line-height: 24px;
`;

const RecipeScreen = () => {
  // This is placeholder data - in a real app, this would come from your backend
  const recipe = {
    title: 'Sample Recipe',
    ingredients: [
      '2 cups flour',
      '1 cup sugar',
      '2 eggs',
      '1 cup milk',
      '1 tsp vanilla extract'
    ],
    instructions: [
      'Preheat oven to 350°F',
      'Mix dry ingredients',
      'Add wet ingredients',
      'Bake for 30 minutes'
    ]
  };

  return (
    <ScrollView>
      <Container>
        <RecipeCard>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          
          <SectionTitle>Ingredients</SectionTitle>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index}>• {ingredient}</Text>
          ))}

          <SectionTitle>Instructions</SectionTitle>
          {recipe.instructions.map((instruction, index) => (
            <Text key={index}>{index + 1}. {instruction}</Text>
          ))}
        </RecipeCard>
      </Container>
    </ScrollView>
  );
};

export default RecipeScreen; 