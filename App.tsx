import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AddTransactionScreen from './screens/AddTransactionScreen/AddTransactionScreen';
import TransactionsScreen from './screens/TransactionsScreen/TransactionsScreen';
import ChartsScreen from './screens/ChartsScreen/ChartsScreen';
import { SQLiteProvider } from "expo-sqlite/next";
import { initDB } from './database/initDB';

const Tab = createBottomTabNavigator();
export default function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.appTitleContainer}>
        <Text style={styles.appTitle}>Money Buddy</Text>
      </View>
      <SQLiteProvider databaseName='moneyBuddy.db' onInit={initDB} >
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Início"
            screenOptions={{
              tabBarActiveTintColor: '#f0f0f0',
              tabBarInactiveTintColor: '#ffc146',
              tabBarStyle: {
                backgroundColor: '#333333',
                // backgroundColor: '#8446ff',
              },
              tabBarAccessibilityLabel: 'Barra de navegação',
            }}
          >
            <Tab.Screen 
              name="Início"
              component={HomeScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
                title: 'Home',
                headerTitle: 'Resumo financeiro',
                headerTintColor: '#8446ff',
                tabBarAccessibilityLabel: 'Tela inicial',
              }}
              
            />
            <Tab.Screen 
              name="Adicionar Transação" 
              component={AddTransactionScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="plus-box" color={color} size={size} />
                ),
                title: 'Adicionar',
                headerTitle: 'Adicionar Transação',
                headerTintColor: '#8446ff',
                tabBarAccessibilityLabel: 'Adicionar transação',
              }}
            />
            <Tab.Screen 
              name="Transações" 
              component={TransactionsScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
                ),
                title: 'Transações',
                headerTitle: 'Transações',
                headerTintColor: '#8446ff',
                tabBarAccessibilityLabel: 'Transações',
              }}
            />
            <Tab.Screen 
              name="Gráficos" 
              component={ChartsScreen} 
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
                ),
                title: 'Gráficos',
                headerTitle: 'Gráficos',
                headerTintColor: '#8446ff',
                tabBarAccessibilityLabel: 'Gráficos das transações',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SQLiteProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f0f0f0',
  },
  appTitleContainer: {
    padding: 16,
    backgroundColor: '#8446ff',
  },
});