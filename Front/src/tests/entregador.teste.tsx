import { useEffect } from "react"
import { useEntregador } from "../hooks/useEntregador"
import { EntregadorDTO } from "../models/entregador/Entregador.dto"
import { Entregador } from "../models/entregador/Entregador.model"

export function TesteEntregador() {
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
    <div className="bg-cyan-950">
      <div className="flex justify-center items-center">
        <h1>Entregador</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
      {data && Array.isArray(data) && (
        <>
          <ul>
            {
              data.map((entregador: Entregador) => {
                return (
                  <li key={entregador.codent} className="bg-purple-950 p-3 flex items-center justify-start gap-x-12">
                    <div>
                      <div className="space-x-3">
                        <span><strong>{entregador.codent} - {entregador.nome} - {entregador.cnh}</strong></span>
                        <button onClick={() => handleUpdateEntregador({
                          codent: entregador.codent,
                          nome: "Juliao",
                          codger: null,
                          codfun: entregador.codfun,
                          cnh: 135792468
                        })}>Atualizar</button>
                        <button onClick={() => handleDeleteEntregador(entregador.codent)}>Deletar</button>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          <button onClick={() => handleAddEntregador({ nome: "Julio", cnh: 246813579, codger: null })}>CREATE</button>
        </>
      )}
    </div>

  )
}
