import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { styles } from '../styles/styles';

export default function Login({ navigation, onLogin, loading }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    setLoggingIn(true);
    try {
      await onLogin(email.trim(), senha, navigation);
    } catch (error) {
      Alert.alert('Erro', 'Falha no login');
    } finally {
      setLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput 
        placeholder="Email" 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
        keyboardType="email-address"
      />
      <TextInput 
        placeholder="Senha" 
        style={styles.input} 
        value={senha} 
        onChangeText={setSenha} 
        secureTextEntry 
      />
      
      {loggingIn ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}
      
      <View style={{ height: 12 }} />
      <Button title="Recuperar Acesso" onPress={() => navigation.navigate('Recuperacao')} />
    </View>
  );
}