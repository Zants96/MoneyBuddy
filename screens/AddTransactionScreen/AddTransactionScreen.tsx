import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddTransactionScreen() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Lançamento</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
