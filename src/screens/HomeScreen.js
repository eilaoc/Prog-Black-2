import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
`;

const UploadButton = styled(TouchableOpacity)`
  background-color: #f4511e;
  padding: 15px 30px;
  border-radius: 25px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const HomeScreen = ({ navigation }) => {
  const handleUpload = () => {
    navigation.navigate('Recipe');
  };

  return (
    <Container>
      <Title>RecipeGPT</Title>
      <UploadButton onPress={handleUpload}>
        <ButtonText>Upload Video</ButtonText>
      </UploadButton>
    </Container>
  );
};

export default HomeScreen; 