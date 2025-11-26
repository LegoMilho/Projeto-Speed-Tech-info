import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/styles';

export default function EditarCliente({ route, navigation, onEdit }) {
  const { cliente } = route.params;
  const [nome, setNome] = useState(cliente.nome);
  const [telefone, setTelefone] = useState(cliente.telefone);
  const [tipoDispositivo, setTipoDispositivo] = useState(cliente.tipoDispositivo);

  const handleSave = () => {
    if (!nome || !telefone || !tipoDispositivo) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    onEdit(cliente.id, { nome, telefone, tipoDispositivo });
    navigation.goBack();
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#B5A8BD' }}>
      <Text style={styles.title}>Editar Cliente</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Nome" 
        value={nome} 
        onChangeText={setNome} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Telefone" 
        value={telefone} 
        onChangeText={setTelefone} 
        keyboardType="phone-pad" 
      />

      <Text style={{ marginBottom: 6 }}>Tipo de Dispositivo:</Text>
      <Picker 
        selectedValue={tipoDispositivo} 
        style={[styles.input, { height: 50 }]} 
        onValueChange={setTipoDispositivo}
      >
        <Picker.Item label="Celular" value="Celular" />
        <Picker.Item label="Notebook" value="Notebook" />
        <Picker.Item label="PC" value="PC" />
      </Picker>

      <Button title="Salvar Alterações" onPress={handleSave} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Cancelar" onPress={() => navigation.goBack()} color="#999" />
    </ScrollView>
  );
}