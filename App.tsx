import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import AddTransactionScreen from "./screens/AddTransactionScreen/AddTransactionScreen";
import TransactionScreen from "./screens/TransactionsScreen/TransactionsScreen";
import HistoryScreen from "./screens/HistoryScreen/HistoryScreen";
import { SQLiteProvider } from "expo-sqlite/next";
import TransacoesProvider from "./utils/TransactionContext";
import { initDB } from "./database/initDB";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.appTitleContainer}>
        <Text style={styles.appTitle}>Money Buddy</Text>
      </View>
      <SQLiteProvider databaseName="sqliteDB.db" onInit={initDB}>
        <TransacoesProvider>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                tabBarStyle: {
                  backgroundColor: "#333333",
                },
                tabBarActiveTintColor: "#f0f0f0",
                tabBarInactiveTintColor: "#ffc146",
                tabBarActiveBackgroundColor: "#8446ff",
              }}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="home"
                      color={color}
                      size={size}
                    />
                  ),
                  title: "Home",
                  headerTitle: "Resumo Financeiro",
                  headerTintColor: "#8446ff",
                  tabBarAccessibilityLabel: "Resumo Financeiro",
                }}
              />
              <Tab.Screen
                name="Adicionar Transação"
                component={AddTransactionScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="plus-box"
                      color={color}
                      size={size}
                    />
                  ),
                  title: "Adicionar",
                  headerTitle: "Adicionar Transação",
                  headerTintColor: "#8446ff",
                  tabBarAccessibilityLabel: "Adicionar Transação",
                }}
              />
              <Tab.Screen
                name="Transações"
                component={TransactionScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="format-list-bulleted"
                      color={color}
                      size={size}
                    />
                  ),
                  title: "Transações",
                  headerTitle: "Transações no Mês",
                  headerTintColor: "#8446ff",
                  tabBarAccessibilityLabel: "Transações",
                }}
              />
              <Tab.Screen
                name="Histórico"
                component={HistoryScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="book"
                      color={color}
                      size={size}
                    />
                  ),
                  title: "Histórico",
                  headerTitle: "Histórico de Transações",
                  headerTintColor: "#8446ff",
                  tabBarAccessibilityLabel: "Histórico das transações",
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </TransacoesProvider>
      </SQLiteProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#f0f0f0",
    marginTop: 16,
  },
  appTitleContainer: {
    padding: 16,
    backgroundColor: "#8446ff",
  },
});
