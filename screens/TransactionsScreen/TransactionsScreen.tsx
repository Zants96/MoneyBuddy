import React, { useContext, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
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
        {item.categoria} / {item.tipo}
        {"\n"}
        {formatarData(item.data)}
      </Text>
      <Text></Text>
      <Text
        style={
          item.tipo === "Despesa" ? styles.despesaTotal : styles.receitaTotal
        }
      >
        {formatarTotal(item.total)}
      </Text>

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
    <ScrollView>
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
            modoDeletar && { backgroundColor: "#CC0000" },
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
    </ScrollView>
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
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#CC0000",
    borderRadius: 10,
  },
  receita: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#008800",
    borderRadius: 10,
  },
  despesaTipo: {
    color: "#CC0000",
    fontSize: 16,
    marginTop: 2,
  },
  receitaTipo: {
    color: "#008800",
    fontSize: 16,
    marginTop: 2,
  },
  despesaDescricao: {
    color: "#CC0000",
    fontWeight: "bold",
    fontSize: 21,
  },
  receitaDescricao: {
    color: "#008800",
    fontWeight: "bold",
    fontSize: 21,
  },
  despesaTotal: {
    color: "#CC0000",
    fontSize: 18,
    fontWeight: "bold",
  },
  receitaTotal: {
    color: "#008800",
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
    marginTop: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#CC0000",
    borderRadius: 10,
  },
  apagarView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  apagarTexto: {
    color: "#CC0000",
    textAlign: "center",
    marginHorizontal: 5,
  },
  modoDeletar: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#CC0000",
    borderRadius: 10,
  },
  modoDeletarText: {
    color: "#CC0000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
