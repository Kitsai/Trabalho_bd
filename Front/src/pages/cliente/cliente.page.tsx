import { useEffect, useState } from "react";
import { useCliente } from "../../hooks/useCliente"
import { ClienteDTO } from "../../models/cliente/cliente.dto";
import { Cliente } from "../../models/cliente/cliente.model";
import { ClienteListItem } from "../../components/cliente/cliente.component";
import { FormCliente } from "./formCliente.teste";
import { NavBar } from "../../components/navbar/navbar";
import { useEntregador } from "../../hooks/useEntregador";

export function ClientePage() {
  const {
    data,
    loading,
    error,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente
  } = useCliente();

  const entH = useEntregador();
  const dataEnt = entH.data;
  const loadingEnt = entH.loading;
  const getEnt = entH.getEntregador;

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null)

  function openUpdate(c: Cliente) {
    setSelectedClient(c)
    if (!isCreateOpen) {
      setUpdateOpen(true)
    };
  }
  function closeUpdate() {
    setUpdateOpen(false)
  }

  function openCreate() {
    if (!isUpdateOpen) {
      setCreateOpen(true)
    };
  }

  function closeCreate() {
    setCreateOpen(false)
  }

  useEffect(() => {
    console.log(getCliente());
    console.log(getEnt())
  }, [getCliente, getEnt]);

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
    <>
      < NavBar />
      <div className="flex justify-center items-center">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <button className="text-center text-2xl bg-sat-blue text-light-gray p-2 mt-2 rounded-xs hover:shadow-lg hover:shadow-sat-blue/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={() => { openCreate() }}>
          CRIAR
        </button>
      </div>
      {data && Array.isArray(data) && (
        <ul className="pl-10 pr-10 pb-10 pt-2">
          {
            data.map((cliente: Cliente) => {
              return (
                <ClienteListItem
                  cliente={cliente}
                  entregadores={dataEnt || []}
                  loadingEnt={loadingEnt}
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
    </>
  )
}
