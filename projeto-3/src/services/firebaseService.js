const FIREBASE_URL = "https://firestore.googleapis.com/v1/projects/app1-130d0/databases/(default)/documents/clientes";


const generateId = () => `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const firebaseService = {

  async salvarCliente(cliente) {
    try {
      const clienteData = {
        fields: {
          nome: { stringValue: cliente.nome },
          telefone: { stringValue: cliente.telefone },
          tipoDispositivo: { stringValue: cliente.tipoDispositivo },
          dataHora: { stringValue: cliente.dataHora || new Date().toLocaleString() },
          localId: { stringValue: cliente.id || generateId() }
        }
      };

      console.log('Enviando para Firebase:', clienteData);

      const response = await fetch(FIREBASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Resposta do Firebase:', data);
      return data;

    } catch (error) {
      console.error('Erro detalhado ao salvar no Firebase:', error);
      throw error;
    }
  },

  async buscarClientes() {
    try {
      console.log('Buscando clientes do Firebase...');
      const response = await fetch(FIREBASE_URL);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('Dados recebidos do Firebase:', data);

      if (!data.documents) {
        return [];
      }

      const clientes = data.documents.map(doc => {
        const fields = doc.fields;
        const firebaseId = doc.name.split('/').pop();
        
        return {
          id: fields.localId?.stringValue || firebaseId,
          firebaseId: firebaseId,
          nome: fields.nome?.stringValue || '',
          telefone: fields.telefone?.stringValue || '',
          tipoDispositivo: fields.tipoDispositivo?.stringValue || '',
          dataHora: fields.dataHora?.stringValue || new Date().toLocaleString()
        };
      });

      console.log('Clientes processados:', clientes);
      return clientes;

    } catch (error) {
      console.error('Erro detalhado ao buscar do Firebase:', error);
      throw error;
    }
  },

  async atualizarCliente(firebaseId, clienteAtualizado) {
    try {
      const updateData = {
        fields: {
          nome: { stringValue: clienteAtualizado.nome },
          telefone: { stringValue: clienteAtualizado.telefone },
          tipoDispositivo: { stringValue: clienteAtualizado.tipoDispositivo },
          dataHora: { stringValue: clienteAtualizado.dataHora || new Date().toLocaleString() }
        }
      };

      const updateMask = {
        updateMask: {
          fieldPaths: ["nome", "telefone", "tipoDispositivo", "dataHora"]
        }
      };

      const url = `${FIREBASE_URL}/${firebaseId}`;
      
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updateData,
          ...updateMask
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Erro ao atualizar no Firebase:', error);
      throw error;
    }
  },

  async excluirCliente(firebaseId) {
    try {
      const url = `${FIREBASE_URL}/${firebaseId}`;
      
      const response = await fetch(url, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return true;

    } catch (error) {
      console.error('Erro ao excluir do Firebase:', error);
      throw error;
    }
  },

  async sincronizarDadosLocais(clientesLocais) {
    try {
      const clientesFirebase = await this.buscarClientes();
      const clientesParaSincronizar = [];

      for (const localCliente of clientesLocais) {
        const existeNoFirebase = clientesFirebase.some(
          fbCliente => fbCliente.id === localCliente.id
        );

        if (!existeNoFirebase && !localCliente.firebaseId) {
          clientesParaSincronizar.push(localCliente);
        }
      }

      for (const cliente of clientesParaSincronizar) {
        await this.salvarCliente(cliente);
      }

      return {
        sincronizados: clientesParaSincronizar.length,
        totalFirebase: clientesFirebase.length
      };

    } catch (error) {
      console.error('Erro na sincronização:', error);
      throw error;
    }
  }
};