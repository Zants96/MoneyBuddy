import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TransacoesContext } from "../../utils/TransactionContext";
import { ITransacao } from "../../interface/types";
import { useFocusEffect } from "@react-navigation/native";

export default function HistoryScreen() {
  const context = useContext(TransacoesContext);
  const {
    setMesEscolhido,
    setAnoEscolhido,
    totalReceitaMesEscolhido,
    totalDespesaMesEscolhido,
    saldoMesEscolhido,
    transacoes,
    formatarData,
    formatarTotal,
    atualizarAbaAtiva,
    abaAtiva,
    fetchTransacoes,
  } = context!;
  const [mes, setMes] = useState(new Date().getMonth());
  const [ano, setAno] = useState(new Date().getFullYear());
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  useFocusEffect(() => atualizarAbaAtiva("Historico"));

  useEffect(() => {
    fetchTransacoes();
  }, [abaAtiva]);

  const handleMesChange = (itemValue: number) => {
    setMes(itemValue);
    setMesEscolhido(itemValue);
  };

  const handleAnoChange = (itemValue: number) => {
    setAno(itemValue);
    setAnoEscolhido(itemValue);
  };

  const transacoesFiltradas = transacoes.filter((transacao: ITransacao) => {
    const transacaoDate = new Date(transacao.data);
    return (
      transacaoDate.getMonth() === mes && transacaoDate.getFullYear() === ano
    );
  });

  let formataReceitaMesEscolhido = totalReceitaMesEscolhido.toLocaleString(
    "pt-br",
    {
      minimumFractionDigits: 2,
    }
  );
  let formataDespesaMesEscolhido = totalDespesaMesEscolhido.toLocaleString(
    "pt-br",
    {
      minimumFractionDigits: 2,
    }
  );
  let formataSaldoMesEscolhido = saldoMesEscolhido.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
  });

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
      <Text
        style={
          item.tipo === "Despesa" ? styles.despesaTotal : styles.receitaTotal
        }
      >
        {formatarTotal(item.total)}
      </Text>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerPicker}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={mes}
              onValueChange={handleMesChange}
              style={styles.picker}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <Picker.Item key={i} label={`${months[i]}`} value={i} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={ano}
              onValueChange={handleAnoChange}
              style={styles.picker}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Picker.Item key={i} label={`${2023 + i}`} value={2023 + i} />
              ))}
            </Picker>
          </View>
        </View>

        <Text style={styles.receitaTexto}>
          Total de Receitas: R$ {formataReceitaMesEscolhido}
        </Text>
        <Text style={styles.despesaTexto}>
          Total de Despesas: R$ {formataDespesaMesEscolhido}
        </Text>
        <Text
          style={[
            styles.saldoTexto,
            saldoMesEscolhido >= 0 ? styles.positivo : styles.negativo,
          ]}
        >
          Saldo: R$ {formataSaldoMesEscolhido}
        </Text>
      </View>

      {transacoesFiltradas.length > 0 ? (
        <View style={styles.containerFlatlist}>
          <FlatList
            data={transacoesFiltradas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id!.toString()}
          />
          <Text>{"\n"}</Text>
        </View>
      ) : (
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Nenhuma transação encontrada</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#8446ff",
    borderRadius: 10,
    margin: 10,
  },
  containerFlatlist: {
    flex: 2,
    justifyContent: "flex-start",
    padding: 5,
    borderWidth: 1,
    borderColor: "#8446ff",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#f0f0f0",
  },
  containerTitle: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8446ff",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8446ff",
  },
  containerPicker: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5,
  },
  pickerContainer: {
    height: 50,
    width: 155,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#8446ff",
    aspectRatio: 3,
    alignSelf: "flex-end",
  },
  receitaTexto: {
    fontSize: 18,
    color: "#008800",
    marginTop: 5,
  },
  despesaTexto: {
    fontSize: 18,
    color: "#CC0000",
    marginTop: 5,
  },
  saldoTexto: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  positivo: {
    color: "#008800",
  },
  negativo: {
    color: "#CC0000",
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
    marginTop: 12,
  },
  receitaTotal: {
    color: "#008800",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
});
