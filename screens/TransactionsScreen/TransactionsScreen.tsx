import React, { useContext, useState } from "react";
import { View, FlatList, StyleSheet, Text, Pressable } from "react-native";
import { TransacoesContext } from "../../utils/TransactionContext";
import { ITransacao } from "../../interface/types";
import Icon from "react-native-vector-icons/FontAwesome";

export default function TransacoesScreen() {
  const context = useContext(TransacoesContext);
  const {
    transacoes,
    deleteTransacao,
    fetchTransacoesMesAtual,
    formatarData,
    formatarTotal,
  } = context!;
  const [modoDeletar, setModoDeletar] = useState(false);

  const handleDelete = (id: number) => {
    deleteTransacao(id);
    fetchTransacoesMesAtual();
  };

  const handleModoDeletar = () => {
    setModoDeletar(!modoDeletar);
  };

  const temTransacao = transacoes.length > 0;

  const renderItem = ({ item }: { item: ITransacao }) => (
    <View style={item.tipo === "Despesa" ? styles.despesa : styles.receita}>
      <Text
        style={
          item.tipo === "Despesa"
            ? styles.despesaDescricao
            : styles.receitaDescricao
        }
      >
        {item.descricao}
      </Text>
      <Text
        style={
          item.tipo === "Despesa" ? styles.despesaTipo : styles.receitaTipo
        }
      >
        {item.tipo} - {formatarData(item.data)}
      </Text>
      <Text></Text>
      <Text
        style={
          item.tipo === "Despesa" ? styles.despesaTotal : styles.receitaTotal
        }
      >
        {formatarTotal(item.total)}
      </Text>

      {/* <Text>{item.categoria}</Text> */}

      {modoDeletar && (
        <>
          <Pressable
            onPress={() => handleDelete(item.id!)}
            style={styles.apagar}
          >
            <View style={styles.apagarView}>
              <Icon name="trash" size={28} style={styles.apagarTexto} />
              <Text style={styles.apagarTexto}>Apagar</Text>
            </View>
          </Pressable>
          <Text></Text>
        </>
      )}
    </View>
  );

  return temTransacao ? (
    <>
      <View style={styles.container}>
        <FlatList
          data={transacoes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id!.toString()}
        />
        <Text></Text>

        <Pressable
          onPress={handleModoDeletar}
          style={() => [
            styles.modoDeletar,
            modoDeletar && { backgroundColor: "#FF0000" },
          ]}
        >
          <Text
            style={[
              styles.modoDeletarText,
              modoDeletar && {
                color: "#F0F0F0",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
              },
            ]}
          >
            {modoDeletar ? "Modo Apagar Ligado" : "Ligar Modo Apagar"}
          </Text>
        </Pressable>
      </View>
    </>
  ) : (
    <View style={styles.containeTitle}>
      <Text style={styles.title}>Nenhuma transação encontrada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  despesa: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "red",
    borderRadius: 10,
  },
  receita: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "green",
    borderRadius: 10,
  },
  despesaTipo: {
    color: "red",
    fontSize: 16,
  },
  receitaTipo: {
    color: "green",
    fontSize: 16,
  },
  despesaDescricao: {
    color: "red",
    fontWeight: "bold",
    fontSize: 21,
  },
  receitaDescricao: {
    color: "green",
    fontWeight: "bold",
    fontSize: 21,
  },
  despesaTotal: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
  receitaTotal: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
  },
  containeTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#8446ff",
  },
  apagar: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
  },
  apagarView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  apagarTexto: {
    color: "#FF0000",
    textAlign: "center",
    marginHorizontal: 5,
  },
  modoDeletar: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#FF0000",
    borderRadius: 10,
  },
  modoDeletarText: {
    color: "#FF0000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
