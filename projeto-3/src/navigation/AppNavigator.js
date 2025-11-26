import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Config from '../screens/Config';
import Recuperacao from '../screens/Recuperacao';
import CadastroCliente from '../screens/CadastroCliente';
import ListaClientes from '../screens/ListaClientes';
import EditarCliente from '../screens/EditarCliente';
import Relatorio from '../screens/Relatorio';
import MensagemPronta from '../screens/MensagemPronta';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ 
  currentUser, 
  admin, 
  clientes, 
  onLogin, 
  onLogout, 
  onUpdateAdmin, 
  onRecover, 
  onAddCliente, 
  onRemoveCliente, 
  onEditCliente,
  onSincronizarDados,
  loading 
}) {
  return (
    <Stack.Navigator initialRouteName={currentUser ? 'Home' : 'Login'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {props => <Login {...props} onLogin={onLogin} loading={loading} />}
      </Stack.Screen>

      <Stack.Screen name="Home">
        {props => (
          <Home 
            {...props} 
            user={currentUser} 
            onLogout={onLogout} 
            onSincronizarDados={onSincronizarDados}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Config">
        {props => <Config {...props} admin={admin} onUpdate={onUpdateAdmin} />}
      </Stack.Screen>

      <Stack.Screen name="Recuperacao">
        {props => <Recuperacao {...props} onRecover={onRecover} />}
      </Stack.Screen>

      <Stack.Screen name="CadastroCliente">
        {props => <CadastroCliente {...props} onAddCliente={onAddCliente} />}
      </Stack.Screen>

      <Stack.Screen name="ListaClientes">
        {props => (
          <ListaClientes 
            {...props} 
            clientes={clientes} 
            onRemove={onRemoveCliente} 
            onEdit={onEditCliente} 
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="EditarCliente">
        {props => <EditarCliente {...props} onEdit={onEditCliente} />}
      </Stack.Screen>

      <Stack.Screen name="Relatorio">
        {props => <Relatorio {...props} clientes={clientes} />}
      </Stack.Screen>

      <Stack.Screen name="MensagemPronta" component={MensagemPronta} />
    </Stack.Navigator>
  );
}