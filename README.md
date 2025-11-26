# Projeto-Speed-Tech-info
Um aplicativo criado para o armazenamento de informações do cliente para fins de manutenção de eletrônicos

##como usar
para usar este aplicativo no expo snack basta importar estes arquivos na plataforma, apenas clique nos 3 pontos a direita da aba "project" para importar ou os arquivos ou o repositório do git;
quanto as dependências do aplicativo, elas se encontram no package.json,

##técnologias utilizadas
Expo snack,
React,
React-Native
React-navigation,
asyncStorage,
banco de dados firebase,
API do Whatsapp

##estruturação das pastas

/src

├──/navigation

         └──AppNavigator.js
 
├──/screens

    └──CadastroCliente.js
  
    └──Config.js
  
    └──EditarCliente.js
  
    └──Home.js
  
    └──ListaClientes.js
  
    └──Login.js
  
    └──MensagemPronta.js
  
    └──Recuperacao.js
  
    └──Relatorio.js
  
  
├──services

    └──firebaseService.js
  
├──styles

    └──styles.js


##Funcionalidades do aplicativo

Tela de login com acesso ao menu de recuperação de senhas, homepage com acesso a outras funcionalidades do aplicativo e botões para a sincronia com o banco de dados e logout, tela de configuração para troca de email e senha localmente, tela de cadastro de clientes que registra nome, telefone e tipo de dispositivo no banco de dados firebase, lista de clientes com todas as informações registradas e botões para edição de clientes, acesso direto ao whatsapp e exclusão do cliente, e por fim o criador de relatório que gera uma mensagem pré-pronta para ser enviada para o cliente pelo whatsapp

##Exibição

<img width="365" height="535" alt="CadastroCliente" src="https://github.com/user-attachments/assets/5da0ea89-9188-41d6-b9d0-e1958101c8cd" />


