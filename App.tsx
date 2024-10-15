import React, { useEffect, Suspense } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import AddTransactionScreen from "./screens/AddTransactionScreen/AddTransactionScreen";
import TransactionScreen from "./screens/TransactionsScreen/TransactionsScreen";
import HistoryScreen from "./screens/HistoryScreen/HistoryScreen";
import { SQLiteProvider } from "expo-sqlite/next";
import TransacoesProvider from "./utils/TransactionContext";

const Tab = createBottomTabNavigator();
const loadDatabase = async () => {
  const dbName = "sqliteDB.db";
  const dbAsset = require("./database/sqliteDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function App() {
  useEffect(() => {
    loadDatabase();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.appTitleContainer}>
          <Text style={styles.appTitle}>Money Buddy</Text>
        </View>
        <Suspense
          fallback={
            <View style={{ flex: 1 }}>
              <ActivityIndicator size={"large"} />
              <Text>Carregando os dados...</Text>
            </View>
          }
        >
          <SQLiteProvider databaseName="sqliteDB.db" useSuspense>
            <TransacoesProvider>
              <Tab.Navigator
                initialRouteName="Início"
                screenOptions={{
                  tabBarActiveTintColor: "#f0f0f0",
                  tabBarInactiveTintColor: "#ffc146",
                  tabBarStyle: {
                    backgroundColor: "#333333",
                    // backgroundColor: '#8446ff',
                  },
                  tabBarAccessibilityLabel: "Barra de navegação",
                }}
              >
                <Tab.Screen
                  name="Início"
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
            </TransacoesProvider>
          </SQLiteProvider>
        </Suspense>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#f0f0f0",
  },
  appTitleContainer: {
    padding: 16,
    backgroundColor: "#8446ff",
  },
});
