import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function TransactionsScreen() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lançamentos</Text>
      <Button title="Adicionar Lançamento" onPress={() => {}} />
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
  }
});
