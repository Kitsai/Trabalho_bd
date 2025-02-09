import { useEffect } from "react"
import { useEntregador } from "../../hooks/useEntregador"
import { EntregadorDTO } from "../../models/entregador/Entregador.dto"
import { Entregador } from "../../models/entregador/Entregador.model"
import { NavBar } from "../../components/navbar/navbar"

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
    <div className="">
      <NavBar />
      <div className="flex justify-center items-center">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
      {data && Array.isArray(data) && (
        <div>
          <div className="container flex flex-col items-center">
          <button 
          className="text-center text-2xl bg-sat-blue text-light-gray p-2 mt-2 rounded-xl"
          onClick={() => handleAddEntregador({ nome: "Julio", cnh: 246813579, codger: null })}>CREATE</button>
          </div>
          <ul className="pl-10 pr-10 pb-10 pt-2">
            {
              data.map((entregador: Entregador) => {
                return (
                  <li key={entregador.codent} className="bg-amber-50 p-5 flex justify-between items-center gap-x-12 my-3 rounded-xl">
                      <div>
                        <span className="text-dark-blue font-semibold">{entregador.codent} - {entregador.nome} - {entregador.cnh}</span>
                      </div>
                      <div className="flex justify-between space-x-4 items-baseline rounded-2xl text-dark-blue">
                        <button
                        className="outline-1 outline-dark-blue p-1 rounded-xs"

                        onClick={() => handleUpdateEntregador({
                          codent: entregador.codent,
                          nome: "Juliao",
                          codger: null,
                          codfun: entregador.codfun,
                          cnh: 135792468
                        })}>Atualizar</button>
                        <button 
                        className="outline-1 outline-dark-blue p-1 rounded-xs"
                        onClick={() => handleDeleteEntregador(entregador.codent)}>Deletar</button>
                      </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      )}
    </div>

  )
}
