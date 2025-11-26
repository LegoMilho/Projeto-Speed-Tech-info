import { Linking } from 'react-native';
import React from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { styles } from '../styles/styles';

export default function ListaClientes({ navigation, clientes, onRemove, onEdit }) {
  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#B5A8BD' }}>
      <Text style={styles.title}>Lista de Clientes</Text>
      {clientes.map(item => (
        <View key={item.id} style={styles.clientItem}>
          <Text style={styles.info}>Nome: {item.nome}</Text>
          <Text style={styles.info}>Telefone: {item.telefone}</Text>
          <Text style={styles.info}>Dispositivo: {item.tipoDispositivo}</Text>
          <Text style={styles.info}>Data e Hora: {item.dataHora}</Text>
          <View style={{ flexDirection: 'row', marginTop: 8, gap: 8 }}>
            <Button title="Editar" onPress={() => navigation.navigate('EditarCliente', { cliente: item })}/>
            
              <Button title="WhatsApp" 
    color="#25D366" 
    onPress={() => {
      const phone = item.telefone.replace(/\D/g, '');
      const url = `https://wa.me/55${phone}`;
      Linking.openURL(url);
    }} 
  />

            <Button title="Remover" color="#ff4444" onPress={() => onRemove(item.id)} />
          </View>
        </View>
      ))}
      <View style={{ marginVertical: 10 }} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}