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

-Tela de Login:

<img width="376" height="731" alt="Login" src="https://github.com/user-attachments/assets/ae716d5f-f0bf-4bde-8a53-d4ab1038eee7" />

-Tela de Recuperação de acesso:

<img width="359" height="576" alt="Recuperação" src="https://github.com/user-attachments/assets/1eb9d66c-728c-4d9e-84c2-25d1194e6b3f" />

-Tela Homepage:

<img width="375" height="707" alt="Homepage" src="https://github.com/user-attachments/assets/fd4b4996-bf88-4391-aa5c-639c32a24e42" />

-Tela de configuração:

<img width="368" height="589" alt="Configurações" src="https://github.com/user-attachments/assets/3c0f1896-775e-415d-8a68-2fcc5ef54924" />

-Tela de cadastro do cliente:

<img width="365" height="535" alt="CadastroCliente" src="https://github.com/user-attachments/assets/5da0ea89-9188-41d6-b9d0-e1958101c8cd" />

-Tela de Lista dos clientes:

<img width="350" height="455" alt="ListaCliente" src="https://github.com/user-attachments/assets/9e2faa72-1a3d-49cc-96fd-3703e69f502b" />

-Tela do Relatório:

<img width="374" height="569" alt="Relatório" src="https://github.com/user-attachments/assets/6e6d08eb-180d-4d70-a8b4-67129f5846fd" />

Tela da mensagem pronta:

<img width="373" height="666" alt="MensagemPronta" src="https://github.com/user-attachments/assets/5220dbad-fc0c-43b6-908b-07fa6dccd609" />
