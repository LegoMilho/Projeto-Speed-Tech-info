import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { styles } from '../styles/styles';

export default function Config({ navigation, admin, onUpdate }) {
  const [novoNome, setNovoNome] = useState(admin.nome);
  const [novoEmail, setNovoEmail] = useState(admin.email);
  const [novaSenha, setNovaSenha] = useState(admin.senha);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Novo Nome" 
        value={novoNome} 
        onChangeText={setNovoNome} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Novo Email" 
        value={novoEmail} 
        onChangeText={setNovoEmail} 
        autoCapitalize="none" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Nova Senha" 
        value={novaSenha} 
        onChangeText={setNovaSenha} 
        secureTextEntry 
      />
      <Button title="Salvar" onPress={() => onUpdate(novoNome, novoEmail, novaSenha)} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}