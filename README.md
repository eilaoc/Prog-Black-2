# RecipeGPT

A React Native application that helps users extract recipe details from cooking videos.

## Features

- Home screen with video upload functionality
- Recipe details screen
- Modern UI with styled-components
- React Navigation for screen management

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native development environment set up
- iOS Simulator (for Mac) or Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recipegpt
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (Mac only):
```bash
cd ios
pod install
cd ..
```

## Running the App

### iOS
```bash
npm run ios
# or
yarn ios
```

### Android
```bash
npm run android
# or
yarn android
```

## Project Structure

```
recipegpt/
├── src/
│   └── screens/
│       ├── HomeScreen.js
│       └── RecipeScreen.js
├── App.js
├── package.json
└── README.md
```

## Technologies Used

- React Native
- React Navigation
- Styled Components
