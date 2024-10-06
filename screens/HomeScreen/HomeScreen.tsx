import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo Financeiro</Text>
      <Text style={styles.gain}>Total de Ganhos: R$ </Text>
      <Text style={styles.expense}>Total de Gastos: R$ </Text>
      <Text style={[styles.balance, styles.positive]}>
        Saldo: R$ 
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gain: {
    fontSize: 18,
    color: 'green',
  },
  expense: {
    fontSize: 18,
    color: 'red',
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
});
