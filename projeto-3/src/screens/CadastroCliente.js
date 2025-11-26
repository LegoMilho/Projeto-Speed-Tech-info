 import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/styles';

export default function CadastroCliente({ navigation, onAddCliente }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoDispositivo, setTipoDispositivo] = useState('Celular');

  const handleCadastrar = () => {
    if (!nome || !telefone || !tipoDispositivo) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    onAddCliente({ nome, telefone, tipoDispositivo });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Cliente</Text>
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
      <Button title="Cadastrar" onPress={handleCadastrar} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}