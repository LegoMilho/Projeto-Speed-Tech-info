import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/styles';

export default function Relatorio({ navigation, clientes }) {
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [problema, setProblema] = useState('');
  const [melhorias, setMelhorias] = useState('');
  const [orcamento, setOrcamento] = useState('');
  const [prazo, setPrazo] = useState('');

  const handleConfirmar = () => {
    if (!clienteSelecionado || !problema || !orcamento || !prazo) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }
    navigation.navigate('MensagemPronta', {
      cliente: clienteSelecionado,
      problema,
      melhorias,
      orcamento,
      prazo,
    });
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#B5A8BD' }}>
      <Text style={styles.title}>Gerar Orçamento</Text>

      <Text>Selecione o Cliente:</Text>
      <Picker
        selectedValue={clienteSelecionado?.id}
        style={[styles.input, { height: 50 }]}
        onValueChange={(id) => setClienteSelecionado(clientes.find(c => c.id === id))}
      >
        <Picker.Item label="Selecione..." value={null} />
        {clientes.map((c) => (
          <Picker.Item key={c.id} label={c.nome} value={c.id} />
        ))}
      </Picker>

      {clienteSelecionado && (
        <View style={{ marginBottom: 20 }}>
          <Text>Nome: {clienteSelecionado.nome}</Text>
          <Text>Dispositivo: {clienteSelecionado.tipoDispositivo}</Text>
        </View>
      )}

      <TextInput 
        placeholder="Descreva o problema" 
        style={styles.input} 
        value={problema} 
        onChangeText={setProblema} 
      />
      <TextInput 
        placeholder="Melhorias / Trocas necessárias" 
        style={styles.input} 
        value={melhorias} 
        onChangeText={setMelhorias} 
      />
      <TextInput 
        placeholder="Orçamento (R$)" 
        style={styles.input} 
        value={orcamento} 
        onChangeText={setOrcamento} 
        keyboardType="numeric" 
      />
      <TextInput 
        placeholder="Prazo (Dia e Mês)" 
        style={styles.input} 
        value={prazo} 
        onChangeText={setPrazo} 
      />

      <Button title="Gerar Mensagem" onPress={handleConfirmar} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}