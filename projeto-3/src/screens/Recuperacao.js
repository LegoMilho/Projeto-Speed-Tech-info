import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { styles } from '../styles/styles';

export default function Recuperacao({ navigation, onRecover }) {
  const [masterEmail, setMasterEmail] = useState('');
  const [masterSenha, setMasterSenha] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Acesso</Text>
      <TextInput 
        placeholder="Email Mestre" 
        style={styles.input} 
        value={masterEmail} 
        onChangeText={setMasterEmail} 
      />
      <TextInput 
        placeholder="Senha Mestra" 
        style={styles.input} 
        value={masterSenha} 
        onChangeText={setMasterSenha} 
        secureTextEntry 
      />
      <TextInput 
        placeholder="Novo Email" 
        style={styles.input} 
        value={novoEmail} 
        onChangeText={setNovoEmail} 
      />
      <TextInput 
        placeholder="Nova Senha" 
        style={styles.input} 
        value={novaSenha} 
        onChangeText={setNovaSenha} 
        secureTextEntry 
      />
      <Button title="Redefinir" onPress={() => onRecover(masterEmail, masterSenha, novoEmail, novaSenha, navigation)} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}