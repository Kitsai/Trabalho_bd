import { useEffect } from "react";
import { useCliente } from "./hooks/useCliente"
import { ClienteDTO } from "./models/cliente/cliente.dto";
import { Cliente } from "./models/cliente/cliente.model";

export function App() {
  const {
    data,
    loading,
    error,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente
  } = useCliente();

  useEffect(() => {
    console.log(getCliente());
  }, [getCliente]);

  const handleAddCliente = async (new_client: ClienteDTO) => {
    const created = await createCliente(new_client);
    console.log('Created Cliente: ', created);
    await getCliente();
  }

  const handleUpdateCliente = async (cliente_atualizado: Cliente) => {
    const updated = await updateCliente(cliente_atualizado);
    console.log('Updated Cliente:', updated);
    await getCliente();
  };

  const handleDeleteCliente = async (id: number) => {
    const result = await deleteCliente(id);
    console.log('Deleted Cliente:', result);
    await getCliente();
  };

  return (
    <div className='bg-cyan-950'>
      <h1>Clientes</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && Array.isArray(data) && (
        <ul>
          {
            data.map((cliente: Cliente) => (
              <li key={cliente.codcli}>
                {cliente.nome}
                <button onClick={() => handleUpdateCliente({
                  codcli: cliente.codcli,
                  nome: "Jorgin do pineu",
                  endereco: cliente.endereco,
                  codmes: cliente.codmes,
                  codent: cliente.codent
                })}>Update</button>
                <button onClick={() => handleDeleteCliente(cliente.codcli)}>Delete</button>
              </li>
            ))
          }
        </ul>
      )}
      <button onClick={() => handleAddCliente({ nome: "Jorgin", endereco: "Here", codmes: null })}>Adicionar</button>
    </div>
  )
}

