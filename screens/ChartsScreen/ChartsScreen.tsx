import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráficos de Lançamentos</Text>
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
