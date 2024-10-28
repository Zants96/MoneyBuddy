import React, { useContext } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { TransacoesContext } from "../../utils/TransactionContext";

export default function BackupERestore() {
  const context = useContext(TransacoesContext);

  if (!context) {
    return null;
  }
  const {
    backupDatabase,
    restoreDatabase,
    backupMessage,
    restoreMessage,
    backupDate,
  } = context;

  return (
    <>
      <Text style={styles.backupText}>
        {backupDate
          ? `Último backup realizado em ${backupDate}.`
          : "Nenhum backup realizado."}
      </Text>
      <Pressable onPress={backupDatabase} style={styles.containerBackup}>
        <Text style={styles.title}>Backup da Base de Dados</Text>
      </Pressable>
      {backupMessage ? (
        <Text style={styles.sucessoText}>{backupMessage}</Text>
      ) : null}
      {restoreMessage ? (
        <Text style={styles.sucessoText}>{restoreMessage}</Text>
      ) : null}
      <Pressable onPress={restoreDatabase} style={styles.containerRestore}>
        <Text style={styles.title}>Restaurar a Base de Dados</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  containerRestore: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#008800",
  },
  containerBackup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#AA0000",
  },
  backupText: {
    margin: 16,
    padding: 10,
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#8446ff",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F0F0F0",
    marginTop: 10,
  },
  sucessoText: {
    margin: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#8446ff",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#F0F0F0",
    textAlign: "center",
  },
});
