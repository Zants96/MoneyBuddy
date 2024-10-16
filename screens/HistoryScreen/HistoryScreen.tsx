import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TransacoesContext } from "../../utils/TransactionContext";
import { ITransacao } from "../../interface/types";

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

  const handleMesChange = (itemValue: number) => {
    setMes(itemValue);
    setMesEscolhido(itemValue);
  };

  const handleAnoChange = (itemValue: number) => {
    setAno(itemValue);
    setAnoEscolhido(itemValue);
  };

  const filteredTransacoes = transacoes.filter((transacao: ITransacao) => {
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
            saldoMesEscolhido >= 0 ? styles.positive : styles.negative,
          ]}
        >
          Saldo: R$ {formataSaldoMesEscolhido}
        </Text>
      </View>

      <View style={styles.containerFlatlist}>
        <FlatList
          data={filteredTransacoes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id!.toString()}
        />
        <Text></Text>
      </View>
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
    padding: 10,
    borderWidth: 1,
    borderColor: "#8446ff",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },
  containerPicker: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  pickerContainer: {
    height: 50,
    width: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: "100%",
  },

  receitaTexto: {
    fontSize: 18,
    color: "green",
    marginTop: 5,
  },
  despesaTexto: {
    fontSize: 18,
    color: "red",
    marginTop: 5,
  },
  saldoTexto: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
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
});
