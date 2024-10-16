import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TransacoesContext } from "../../utils/TransactionContext";

export default function HomeScreen() {
  const context = useContext(TransacoesContext);
  const { totalReceita, totalDespesa, saldo } = context!;

  let formataReceita = totalReceita.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });
  let formataDespesa = totalDespesa.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });
  let formataSaldo = saldo.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });

  return (
    <>
      <View style={styles.containerReceitas}>
        <Text style={styles.title}>Total de Receitas</Text>
        <Text style={styles.title}>R$ {formataReceita}</Text>
      </View>
      <View style={styles.containerDespesas}>
        <Text style={styles.title}>Total de Despesas</Text>
        <Text style={styles.title}>R$ {formataDespesa}</Text>
      </View>
      <View style={styles.containerSaldo}>
        <Text style={styles.title}>Saldo</Text>
        <Text style={styles.title}>R$ {formataSaldo}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerReceitas: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#008800",
  },
  containerDespesas: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#AA0000",
  },
  containerSaldo: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#8446ff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F0F0F0",
    marginTop: 10,
  },
});
