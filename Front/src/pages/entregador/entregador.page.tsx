import { useEffect, useState } from "react"
import { useEntregador } from "../../hooks/useEntregador"
import { EntregadorDTO } from "../../models/entregador/Entregador.dto"
import { Entregador } from "../../models/entregador/Entregador.model"
import { NavBar } from "../../components/navbar/navbar"
import { FormEntregador } from "./formEntregador"
import { EntregadorListItem } from "../../components/entregador/entregador.component"

export function EntregadorPage() {
  const {
    data,
    loading,
    error,
    getEntregador,
    createEntregador,
    updateEntregador,
    deleteEntregador
  } = useEntregador()

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [selectedEntregador, setSelectedEntregador] = useState<Entregador | null>(null);

  function openUpdate(e: Entregador) {
    setSelectedEntregador(e)
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
    }
  }

  function closeCreate() {
    setCreateOpen(false)
  }

  useEffect(() => {
    console.log(getEntregador())
  }, [getEntregador])

  async function handleAddEntregador(novo_entregador: EntregadorDTO) {
    const created = await createEntregador(novo_entregador);
    console.log('Created Entregador: ', created)
    await getEntregador();
  }

  async function handleUpdateEntregador(att_entregador: Entregador) {
    const updated = await updateEntregador(att_entregador);
    console.log('Updated Entregador: ', updated);
    await getEntregador();
  }

  async function handleDeleteEntregador(id: number) {
    const deleted = await deleteEntregador(id);
    console.log('Deleted Entregador: ', deleted);
    await getEntregador();
  }

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <button
          className="text-center text-2xl bg-sat-blue text-light-gray p-2 mt-2 rounded-xs hover:shadow-lg hover:shadow-sat-blue/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={() => openCreate()}>
          CRIAR
        </button>
      </div>
      {data && Array.isArray(data) && (
        <>
          <ul className="pl-10 pr-10 pb-10 pt-2">
            {
              data.map((entregador: Entregador) => {
                return (
                  <EntregadorListItem entregador={entregador} handleDelete={handleDeleteEntregador} openUpdate={openUpdate} />
                )
              })
            }
          </ul>

          {isCreateOpen && (<FormEntregador handleCreate={handleAddEntregador} closeForm={closeCreate} />)}
          {isUpdateOpen && selectedEntregador && (<FormEntregador handleUpdate={handleUpdateEntregador} closeForm={closeUpdate} entregador={selectedEntregador} />)}
        </>
      )}
    </>

  )
}
