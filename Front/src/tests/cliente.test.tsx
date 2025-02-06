import { useEffect, useRef, useState } from "react";
import { useCliente } from "../hooks/useCliente"
import { ClienteDTO } from "../models/cliente/cliente.dto";
import { Cliente } from "../models/cliente/cliente.model";
import { ClienteListItem } from "../components/cliente/cliente.component";
import { FormCliente } from "./formCliente.teste";

export function TesteCliente() {
  const {
    data,
    loading,
    error,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente
  } = useCliente();

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);

  const clienteAtual = useRef<Cliente | undefined>(undefined)

  function openUpdate() {
    !isCreateOpen && setUpdateOpen(true);
  }
  function closeUpdate() {
    setUpdateOpen(false)
  }

  function openCreate() {
    !isUpdateOpen && setCreateOpen(true);
  }

  function closeCreate() {
    setCreateOpen(false)
  }

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
            data.map((cliente: Cliente) => {
              clienteAtual.current = cliente;
              return (
                <ClienteListItem
                  cliente={cliente}
                  handleDelete={handleDeleteCliente}
                  openUpdate={openUpdate}
                />
              );

            })
          }
        </ul>
      )}
      <button onClick={() => { openCreate() }}>Adicionar</button>

      {isCreateOpen && (<FormCliente closeForm={closeCreate} />)}
      {isUpdateOpen && (<FormCliente closeForm={closeUpdate} cliente={clienteAtual.current} />)}
    </div>
  )
}
