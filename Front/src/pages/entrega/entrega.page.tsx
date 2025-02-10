import { useEffect, useState } from "react";
import { NavBar } from "../../components/navbar/navbar";
import { EntregaListItem } from "../../components/entrega/entrega.component";
import { useCliente } from "../../hooks/useCliente";
import { useEntrega } from "../../hooks/useEntrega";
import { PedidoEntregaCreateDTO, PedidoEntregaUpdateDTO } from "../../models/entrega/entrega.dto";
import { PedidoEntrega } from "../../models/entrega/entrega.model";
import { FormEntrega } from "./formEntrega";
import { useAlimento } from "../../hooks/useAlimento";

export function EntregaPage() {
  const {
    data,
    loading,
    error,
    getEntrega,
    createEntrega,
    updateEntrega,
    deleteEntrega
  } = useEntrega();

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [selectedEntrega, setSelectedEntrega] = useState<PedidoEntrega | null>(null)

  function openUpdate(e: PedidoEntrega) {
    setSelectedEntrega(e)
    if (!isCreateOpen)
      setUpdateOpen(true)
  }

  function closeUpdate() {
    setUpdateOpen(false);
  }

  function openCreate() {
    if (!isUpdateOpen)
      setCreateOpen(true);
  }

  function closeCreate() {
    setCreateOpen(false);
  }

  const cliH = useCliente()

  const dataCli = cliH.data
  const getCliente = cliH.getCliente

  const aliH = useAlimento()
  const dataAli = aliH.data;
  const getAlimentos = aliH.getAlimentos

  useEffect(() => {
    console.log(getEntrega())
    console.log(getCliente())
    console.log(getAlimentos())
  }, [getEntrega, getCliente, getAlimentos])

  async function handleAddEntrega(nova_entrega: PedidoEntregaCreateDTO) {
    console.log(nova_entrega)
    const created = await createEntrega(nova_entrega);
    console.log('Created Entrega: ', created)
    await getEntrega();
  }

  async function handleUpdateEntrega(att_entrega: PedidoEntregaUpdateDTO) {
    const result = await (updateEntrega(att_entrega));
    console.log('Updated Entrega: ', result)
    await getEntrega()
  }

  async function handleDeleteEntrega(id: number) {
    const result = await (deleteEntrega(id));
    console.log('Delete Entrega: ', result)
    await getEntrega()
  }
  return (
    <>
      < NavBar />
      <div className="flex justify-center items-center">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <button
          className="text-center text-2xl bg-sat-blue text-light-gray p-2 mt-2 rounded-xs hover:shadow-lg hover:shadow-sat-blue/40 focus:shadow-none active: opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={() => openCreate()}
        >CRIAR</button>
      </div>
      {data && Array.isArray(data) && (
        <>
          <ul className="px-10 pb-10 pt-2">
            {
              data.map((entrega: PedidoEntrega) => {
                return (
                  <EntregaListItem
                    entrega={entrega}
                    clientes={dataCli || []}
                    alimentos={dataAli || []}
                    handleDelete={handleDeleteEntrega}
                    openUpdate={openUpdate}
                  />
                )
              })
            }
          </ul>
        </>
      )}
      {isCreateOpen && (
        <FormEntrega
          alimentos={dataAli || []}
          clientes={dataCli || []}
          closeForm={closeCreate}
          handleCreateForm={handleAddEntrega}
        />)}
      {isUpdateOpen && selectedEntrega && (
        <FormEntrega
          alimentos={dataAli || []}
          clientes={dataCli || []}
          closeForm={closeUpdate}
          handleUpdateForm={handleUpdateEntrega}
          entrega={{
            codpedent: selectedEntrega.codpedent,
            codcli: selectedEntrega.codcli,
            time: selectedEntrega.time
          }}
        />)}
    </>
  )
}
