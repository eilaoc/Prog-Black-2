import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type Ingredient = {
  item: string;
  quantity?: string;
};

type ParsedRecipe = {
  dish_name: string;
  ingredients: Ingredient[];
  instructions: string[];
  prep_time: string;
  cook_time: string;
  serving_size: string;
};

export default function RecipeScreen() {
  const params = useLocalSearchParams();

  let parsed: ParsedRecipe;
  try {
    parsed = typeof params.parsed_recipe === 'string'
      ? JSON.parse(params.parsed_recipe)
      : {
          dish_name: '',
          ingredients: [],
          instructions: [],
          prep_time: '',
          cook_time: '',
          serving_size: '',
        };
  } catch (error) {
    console.error('Failed to parse recipe:', error);
    parsed = {
      dish_name: 'Error loading recipe',
      ingredients: [],
      instructions: [],
      prep_time: '',
      cook_time: '',
      serving_size: '',
    };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{parsed.dish_name || 'Recipe'}</Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Ingredients</Text>
          </View>
          <View style={styles.sectionContent}>
            {parsed.ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientRow}>
                <Text style={styles.ingredientItem}>{item.item}</Text>
                <Text style={styles.ingredientQty}>{item.quantity || ''}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Instructions</Text>
          </View>
          <View style={styles.sectionContent}>
            {parsed.instructions.map((step, index) => (
              <Text key={index} style={styles.instructionLine}>
                {index + 1}. {step}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.metaBox}>
          <Text style={styles.meta}>
            Prep: {parsed.prep_time}   |   Cook: {parsed.cook_time}   |  Serves: {parsed.serving_size}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6DA86F',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  scroll: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: '#5F965F',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    padding: 16,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ingredientItem: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  ingredientQty: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 12,
  },
  instructionLine: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    lineHeight: 22,
  },
  metaBox: {
    marginTop: 10,
    alignItems: 'center',
  },
  meta: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
  },
});