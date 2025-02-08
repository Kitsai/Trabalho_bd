import { useEffect, useState } from "react";
import { useCliente } from "../hooks/useCliente"
import { ClienteDTO } from "../models/cliente/cliente.dto";
import { Cliente } from "../models/cliente/cliente.model";
import { ClienteListItem } from "../components/cliente/cliente.component";
import { FormCliente } from "./formCliente.teste";
import { NavBar } from "../components/navbar/navbar";

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
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null)

  function openUpdate(c: Cliente) {
    setSelectedClient(c)
    if(!isCreateOpen){
      setUpdateOpen(true)
    };
  }
  function closeUpdate() {
    setUpdateOpen(false)
  }

  function openCreate() {
    if(!isUpdateOpen){
      setCreateOpen(true)};
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
    console.info('here')
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
    <div className='bg-gray-300'>
      < NavBar />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={() => { openCreate() }}>Adicionar</button>
      {data && Array.isArray(data) && (
        <ul className="p-10">
          {
            data.map((cliente: Cliente) => {
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

      {isCreateOpen && (<FormCliente handleCreateForm={handleAddCliente} closeForm={closeCreate} />)}
      {isUpdateOpen && selectedClient && (<FormCliente handleUpdateForm={handleUpdateCliente} closeForm={closeUpdate} cliente={selectedClient} />)}
    </div>
  )
}
