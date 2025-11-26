import { Linking } from 'react-native';
import React from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { styles } from '../styles/styles';

export default function MensagemPronta({ route, navigation }) {
  const { cliente, problema, melhorias, orcamento, prazo } = route.params;

  const mensagem = `
Olá ${cliente.nome}, tudo bem?

Quanto ao seu ${cliente.tipoDispositivo}, identificamos o seguinte problema:
${problema}

${melhorias ? `Também sugerimos as seguintes melhorias: ${melhorias}\n` : ''}
O orçamento total fica em R$ ${orcamento}.

Previsão de retirada: ${prazo}.

Por favor, confirme o ACEITE deste orçamento:
Responda **SIM** para confirmar ou **NÃO** para recusar.
Caso sua resposta seja diferente, entraremos em contato para esclarecer.

Agradecemos pela confiança!
`;

const EnviarWhatsApp = () => {
    try {
      const phone = cliente.telefone.replace(/\D/g,'');
      const text = encodeURIComponent(mensagem);

      if (!phone) {
        Alert.alert('Erro', 'O número do cliente é inválido.');
        return;
      }

      Linking.openURL(`https://wa.me/55${phone}?text=${text}`);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#E9DFF0' }}>
      <Text style={styles.title}>Mensagem Gerada</Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>{mensagem}</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
      <Button title="Enviar pelo WhatsApp" color="#25D366" onPress={EnviarWhatsApp}/>
    </ScrollView>
  );
}