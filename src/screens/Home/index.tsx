import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      Alert.alert(
        "Pariticipante Existe",
        "Já existe um participante com esse nome"
      );
      return;
    }
    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert(
      "Remover Participante",
      `Deseja remover o participante ${name}?`,
      [
        {
          text: "Sim",
          onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Sextam 4 de Novembro de 2022</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={text => setParticipantName(text)}
          value={participantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <Text />
      </View>
      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguem Chegou no evento ainda? Adicione participantes a sua lista
            de espera
          </Text>
        )}
      />
    </View>
  );
}
