import React, { useEffect, useState } from 'react';
import { Alert, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { firebaseService } from './src/services/firebaseService';

const EMAIL_MESTRE = 'master@meusite.com';
const SENHA_MESTRE = 'Master@2025';

export default function App() {
  const initialAdmin = {
    nome: 'Admin',
    email: 'admin@meusite.com',
    senha: 'admin123',
  };

  const [admin, setAdmin] = useState(initialAdmin);
  const [currentUser, setCurrentUser] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRecovery = async (emailMestre, senhaMestre, novoEmail, novaSenha, navigation) => {
    if (!emailMestre || !senhaMestre || !novoEmail || !novaSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (emailMestre !== EMAIL_MESTRE || senhaMestre !== SENHA_MESTRE) {
      Alert.alert('Erro', 'Credenciais mestras inválidas');
      return;
    }
    const updated = { ...admin, email: novoEmail, senha: novaSenha };
    setAdmin(updated);
    await AsyncStorage.setItem('@admin', JSON.stringify(updated));
    Alert.alert('Sucesso', 'Credenciais do admin atualizadas.');
    navigation.replace('Login');
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        const [jsonUser, jsonAdmin, localClientes] = await Promise.all([
          AsyncStorage.getItem('@currentUser'),
          AsyncStorage.getItem('@admin'),
          AsyncStorage.getItem('@clientes')
        ]);

        if (jsonUser) setCurrentUser(JSON.parse(jsonUser));
        if (jsonAdmin) setAdmin(JSON.parse(jsonAdmin));
        
 
        try {
          const firebaseClientes = await firebaseService.buscarClientes();
          if (firebaseClientes && firebaseClientes.length > 0) {
            setClientes(firebaseClientes);
            await AsyncStorage.setItem('@clientes', JSON.stringify(firebaseClientes));
          } else if (localClientes) {
   
            setClientes(JSON.parse(localClientes));
          }
        } catch (firebaseError) {
          console.log('Erro ao carregar do Firebase, usando dados locais:', firebaseError);
          if (localClientes) {
            setClientes(JSON.parse(localClientes));
          }
        }
      } catch (e) {
        console.log('Erro ao carregar dados iniciais:', e);
        Alert.alert('Erro', 'Não foi possível carregar os dados');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (clientes.length > 0) {
      AsyncStorage.setItem('@clientes', JSON.stringify(clientes)).catch(console.error);
    }
  }, [clientes]);

  useEffect(() => {
    AsyncStorage.setItem('@admin', JSON.stringify(admin)).catch(console.error);
  }, [admin]);


  const handleLogin = async (email, senha, navigation) => {
    if (email === admin.email && senha === admin.senha) {
      setCurrentUser(admin);
      await AsyncStorage.setItem('@currentUser', JSON.stringify(admin));
      navigation.replace('Home');
      return;
    }

    if (email === EMAIL_MESTRE && senha === SENHA_MESTRE) {
      setCurrentUser(admin);
      await AsyncStorage.setItem('@currentUser', JSON.stringify(admin));
      navigation.replace('Home');
      return;
    }

    Alert.alert('Erro', 'Credenciais inválidas');
  };

  const handleLogout = async (navigation) => {
    setCurrentUser(null);
    await AsyncStorage.removeItem('@currentUser');
    navigation.replace('Login');
  };

  const handleUpdateAdmin = async (novoNome, novoEmail, novaSenha) => {
    if (!novoNome || !novoEmail || !novaSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    const updated = { ...admin, nome: novoNome, email: novoEmail, senha: novaSenha };
    setAdmin(updated);
    if (currentUser) {
      setCurrentUser(updated);
      await AsyncStorage.setItem('@currentUser', JSON.stringify(updated));
    }
    Alert.alert('Sucesso', 'Dados atualizados');
  };


  const handleAddCliente = async (cliente) => {
    if (!cliente.nome || !cliente.telefone || !cliente.tipoDispositivo) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const dataHora = new Date().toLocaleString();
      const clienteCompleto = { 
        ...cliente, 
        id: Date.now().toString(), 
        dataHora 
      };

      const firebaseResponse = await firebaseService.salvarCliente(clienteCompleto);
      
      if (firebaseResponse && firebaseResponse.name) {
 
        const firebaseId = firebaseResponse.name.split('/').pop();
        clienteCompleto.firebaseId = firebaseId;
      }


      setClientes(prev => [...prev, clienteCompleto]);
      Alert.alert('Sucesso', 'Cliente cadastrado no Firebase');
      
    } catch (error) {
      console.error('Erro ao salvar no Firebase:', error);
      

      const dataHora = new Date().toLocaleString();
      const clienteLocal = { 
        ...cliente, 
        id: Date.now().toString(), 
        dataHora 
      };
      
      setClientes(prev => [...prev, clienteLocal]);
      Alert.alert('Sucesso', 'Cliente cadastrado (armazenamento local)');
    }
  };

  const handleRemoveCliente = async (id) => {
    Alert.alert('Remover cliente', 'Tem certeza?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {

            const cliente = clientes.find(c => c.id === id);
            
            if (cliente && cliente.firebaseId) {

              await firebaseService.excluirCliente(cliente.firebaseId);
            }
            

            setClientes(prev => prev.filter(c => c.id !== id));
            Alert.alert('Sucesso', 'Cliente removido');
            
          } catch (error) {
            console.error('Erro ao remover do Firebase:', error);
 
            setClientes(prev => prev.filter(c => c.id !== id));
            Alert.alert('Sucesso', 'Cliente removido (apenas localmente)');
          }
        },
      },
    ]);
  };

  const handleEditCliente = async (id, updatedCliente) => {
    try {

      const clienteOriginal = clientes.find(c => c.id === id);
      
      if (clienteOriginal && clienteOriginal.firebaseId) {

        await firebaseService.atualizarCliente(clienteOriginal.firebaseId, updatedCliente);
      }

      setClientes(prev => prev.map(c => 
        c.id === id ? { ...c, ...updatedCliente } : c
      ));
      
      Alert.alert('Sucesso', 'Cliente atualizado');
      
    } catch (error) {
      console.error('Erro ao atualizar no Firebase:', error);
      
      
      setClientes(prev => prev.map(c => 
        c.id === id ? { ...c, ...updatedCliente } : c
      ));
      
      Alert.alert('Sucesso', 'Cliente atualizado (apenas localmente)');
    }
  };

  const handleSincronizarDados = async () => {
    try {
      setLoading(true);
      Alert.alert('Sincronizando', 'Atualizando dados com o Firebase...');
      
      const clientesFirebase = await firebaseService.buscarClientes();
      
      if (clientesFirebase && clientesFirebase.length > 0) {
        setClientes(clientesFirebase);
        Alert.alert('Sucesso', 'Dados sincronizados com o Firebase');
      } else {
        Alert.alert('Info', 'Nenhum dado encontrado no Firebase');
      }
    } catch (error) {
      console.error('Erro na sincronização:', error);
      Alert.alert('Erro', 'Falha na sincronização com Firebase');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B5A8BD' }}>
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator 
        currentUser={currentUser}
        admin={admin}
        clientes={clientes}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onUpdateAdmin={handleUpdateAdmin}
        onRecover={handleRecovery}
        onAddCliente={handleAddCliente}
        onRemoveCliente={handleRemoveCliente}
        onEditCliente={handleEditCliente}
        onSincronizarDados={handleSincronizarDados}
        loading={loading}
      />
    </NavigationContainer>
  );
}