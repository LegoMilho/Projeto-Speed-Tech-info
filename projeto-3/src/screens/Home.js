import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';

export default function Home({ navigation, user, onLogout, onSincronizarDados }) {
  
  const handleSincronizar = async () => {
    Alert.alert(
      'Sincronizar Dados',
      'Deseja sincronizar os dados com o Firebase?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sincronizar', 
          onPress: () => onSincronizarDados() 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {user?.nome}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Config')}>
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CadastroCliente')}>
        <Text style={styles.buttonText}>Cadastrar Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListaClientes')}>
        <Text style={styles.buttonText}>Ver Lista de Clientes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Relatorio')}>
        <Text style={styles.buttonText}>Gerar Relatório</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#28a745' }]} 
        onPress={handleSincronizar}
      >
        <Text style={styles.buttonText}>Sincronizar com Firebase</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#ff4444' }]} 
        onPress={() => onLogout(navigation)}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}