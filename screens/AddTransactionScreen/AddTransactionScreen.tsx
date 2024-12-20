import React, { useState, useContext } from "react";
import {
  TextInput,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select/";
import { ITransacao } from "../../interface/types";
import { TextInputMask } from "react-native-masked-text";
import { TransacoesContext } from "../../utils/TransactionContext";
import { useFocusEffect } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddTransactionScreen() {
  const context = useContext(TransacoesContext);
  const { addTransacao, fetchTransacoes, atualizarAbaAtiva, categorias } =
    context!;
  const [tipoSelecionado, setTipoSelecionado] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("Água");
  const [descricao, setDescricao] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [sucesso, setSucesso] = useState<boolean>(false);
  const [erro, setErro] = useState<boolean>(false);
  const [data, setData] = useState<Date>(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState<boolean>(false);

  useFocusEffect(() => atualizarAbaAtiva("Adicionar"));

  const handleAddTransacao = () => {
    if (!tipoSelecionado || !categoria || !descricao || !total) {
      setErro(true);
      setTimeout(() => setErro(false), 3000);
      return;
    }

    const transacao: ITransacao = {
      total: Number(total.replace(/[^0-9,-]+/g, "").replace(",", ".")),
      descricao: descricao,
      data: data.toISOString(),
      tipo: tipoSelecionado,
      categoria: categoria,
      categoria_id: categorias.find((cat) => cat.nome === categoria)?.id || 0,
    };

    addTransacao(transacao);
    fetchTransacoes();
    setSucesso(true);
    setTipoSelecionado("Despesa");
    setCategoria("");
    setDescricao("");
    setTotal("");
    setTimeout(() => setSucesso(false), 3000);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Tipo de Transação</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(itemValue) => setTipoSelecionado(itemValue)}
            items={[
              { label: "Receita", value: "Receita" },
              { label: "Despesa", value: "Despesa" },
            ]}
            style={{
              inputAndroid: styles.picker,
            }}
            value={tipoSelecionado}
            placeholder={{
              label: "Selecione o tipo da transação",
              value: null,
            }}
          />
        </View>

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(itemValue) => setCategoria(itemValue)}
            items={categorias.map((categoria) => ({
              label: categoria.nome,
              value: categoria.nome,
            }))}
            style={{
              inputAndroid: styles.picker,
            }}
            value={categoria}
            placeholder={{ label: "Selecione uma categoria", value: null }}
          />
        </View>

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.label}>Data</Text>
        <Pressable
          onPress={() => setMostrarDatePicker(true)}
          style={styles.datePickerButton}
        >
          <Text style={styles.datePickerText}>
            {data
              ? data.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "Selecione a data"}
          </Text>
        </Pressable>
        {mostrarDatePicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || data;
              setMostrarDatePicker(false);
              setData(currentDate);
            }}
            locale="pt-BR"
            accentColor="#8446ff"
          />
        )}

        <Text style={styles.label}>Total</Text>
        <TextInputMask
          type={"money"}
          style={styles.input}
          value={total}
          onChangeText={setTotal}
        />
        {sucesso && (
          <View style={styles.sucesso}>
            <Text style={styles.sucessoText}>
              Transação adicionada com sucesso!
            </Text>
          </View>
        )}
        {erro && (
          <View style={styles.erro}>
            <Text style={styles.erroText}>
              Todos os campos são obrigatórios!
            </Text>
          </View>
        )}

        <Pressable
          style={erro || sucesso ? styles.buttonDisabled : styles.button}
          onPress={handleAddTransacao}
        >
          <Text style={styles.buttonText}>Adicionar Transação</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  datePickerButton: {
    height: 50,
    borderColor: "#8446ff",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerText: {
    color: "#8446ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonDisabled: {
    width: 0,
    height: 0,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8446ff",
    marginTop: 10,
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderColor: "#8446ff",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    color: "#8446ff",
    fontSize: 16,
  },
  pickerContainer: {
    height: 50,
    borderColor: "#8446ff",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#8446ff",
  },
  button: {
    height: 50,
    backgroundColor: "#8446ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sucesso: {
    backgroundColor: "#008800",
    padding: 14,
    marginTop: 24,
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
  },
  sucessoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f0f0f0",
    textAlign: "center",
    justifyContent: "center",
  },
  erro: {
    backgroundColor: "#AA0000",
    padding: 14,
    marginTop: 24,
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
  },
  erroText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    justifyContent: "center",
  },
});
