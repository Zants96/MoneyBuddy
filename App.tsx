import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AddTransactionScreen from './screens/AddTransactionScreen/AddTransactionScreen';
import TransactionsScreen from './screens/TransactionsScreen/TransactionsScreen';
import ChartsScreen from './screens/ChartsScreen/ChartsScreen';

const Tab = createBottomTabNavigator();
export default function App() {
 
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Início" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Adicionar Transação" 
          component={AddTransactionScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Transações" 
          component={TransactionsScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Gráficos" 
          component={ChartsScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
