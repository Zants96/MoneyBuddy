import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, Pressable } from "react-native";
import { TransacoesContext } from "../../utils/TransactionContext";
import { ITransacao } from "../../interface/types";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";

export default function TransacoesScreen() {
  const context = useContext(TransacoesContext);
  const {
    transacoes,
    deleteTransacao,
    editarTransacao,
    fetchTransacoesMesAtual,
    formatarData,
    formatarTotal,
    atualizarAbaAtiva,
  } = context!;
  const [modoEditar, setModoEditar] = useState<boolean>(false);
  const temTransacao = transacoes[0] ? true : false;
  const [editando, setEditando] = useState<boolean>(false);
  const [novoTotal, setNovoTotal] = useState<string>("");
  useFocusEffect(() => {
    atualizarAbaAtiva("Transacoes");
  });

  useEffect(() => {
    if (!temTransacao) {
      setModoEditar(false);
      setEditando(false);
    }
  }, [temTransacao]);

  const handleDelete = (id: number) => {
    deleteTransacao(id);
    fetchTransacoesMesAtual();
  };

  const handleEditar = (transacao: ITransacao) => {
    editarTransacao(transacao);
    fetchTransacoesMesAtual();
  };

  const handleModoEditar = () => {
    setModoEditar(!modoEditar);
    if (modoEditar === false) {
      setEditando(false);
    }
    fetchTransacoesMesAtual();
  };

  const renderItem = ({ item }: { item: ITransacao }) => {
    const handleSave = () => {
      handleEditar({ ...item, total: Number(novoTotal) });
      setEditando(false);
    };

    return (
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
        {modoEditar && editando ? (
          <TextInputMask
            type={"money"}
            style={styles.input}
            value={item.total.toFixed(2)}
            onChangeText={(text) =>
              setNovoTotal(text.replace(/[^0-9,-]+/g, "").replace(",", "."))
            }
          />
        ) : (
          <Text
            style={
              item.tipo === "Despesa"
                ? styles.despesaTotal
                : styles.receitaTotal
            }
          >
            {formatarTotal(item.total)}
          </Text>
        )}

        {modoEditar && (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {editando ? (
              <Pressable onPress={handleSave} style={styles.editar}>
                <View style={styles.editarView}>
                  <Icon name="save" size={28} style={styles.editarTexto} />
                  <Text style={styles.editarTexto}>Salvar</Text>
                </View>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => setEditando(true)}
                style={styles.editar}
              >
                <View style={styles.editarView}>
                  <Icon name="pencil" size={28} style={styles.editarTexto} />
                  <Text style={styles.editarTexto}>Editar o valor</Text>
                </View>
              </Pressable>
            )}

            <Pressable
              onPress={() => handleDelete(item.id!)}
              style={styles.apagar}
            >
              <View style={styles.apagarView}>
                <Icon name="trash" size={28} style={styles.apagarTexto} />
                <Text style={styles.apagarTexto}>Apagar</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

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
          onPress={handleModoEditar}
          style={() => [
            styles.modoEditar,
            modoEditar && { backgroundColor: "#CC0000" },
          ]}
        >
          <Text
            style={[
              styles.modoEditarText,
              modoEditar && {
                color: "#F0F0F0",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
              },
            ]}
          >
            {modoEditar ? "Desligar Modo Editar" : "Ligar Modo Editar"}
          </Text>
        </Pressable>
      </View>
    </>
  ) : (
    <View style={styles.containerTitle}>
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
  containerTitle: {
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
  editar: {
    padding: 10,
    marginTop: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#008800",
    borderRadius: 10,
  },
  editarView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  editarTexto: {
    color: "#008800",
    textAlign: "center",
    marginHorizontal: 5,
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
  modoEditar: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#CC0000",
    borderRadius: 10,
  },
  modoEditarText: {
    color: "#CC0000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#008800",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    color: "#008800",
    fontSize: 16,
  },
});
