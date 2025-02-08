import { useEffect } from "react";
import { useEntrega } from "../hooks/useEntrega"
import { PedidoEntregaCreateDTO, PedidoEntregaUpdateDTO } from "../models/entrega/entrega.dto";
import { PedidoEntrega } from "../models/entrega/entrega.model";
import { useCliente } from "../hooks/useCliente";

export function TesteEntrega() {
  const {
    data,
    loading,
    error,
    getEntrega,
    createEntrega,
    updateEntrega,
    deleteEntrega
  } = useEntrega();

  const ali = useCliente()

  const dataCli = ali.data
  const getCliente = ali.getCliente

  useEffect(() => {
    console.log(getEntrega())
  }, [getEntrega])

  async function handleAddEntrega(nova_entrega: PedidoEntregaCreateDTO) {
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
    <div className="bg-cyan-950">
      <div className="flex justify-center items-center">
        <h1>Entrega</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
      {data && Array.isArray(data) && (
        <>
          <ul>
            {
              data.map((entrega: PedidoEntrega) => {
                return (
                  <li key={entrega.codpedent} className="bg-purple-950 p-3 flex items-center justify-start gap-x-12">
                    <div>
                      <div className="space-x-3">
                        <span><strong>{entrega.codpedent} - {entrega.codcli} - {entrega.time.toString()}</strong></span>
                        <button onClick={() => handleUpdateEntrega({ codpedent: entrega.codpedent, codcli: 2, time: new Date("2025-02-03T15:10:17.203Z") })}>Atualizar</button>
                        <button onClick={() => handleDeleteEntrega(entrega.codpedent)}>Deletar</button>
                      </div>
                      <div className="flex ml-12 mr-12 flex-col gap-y-2" >
                        {entrega.alimentos.map((ali) => {
                          return (
                            <div>
                              <span>{ali.codali}</span> - <span>{ali.qtd}</span>
                            </div>
                          )
                        }
                        )}
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          <button onClick={() => handleAddEntrega({ codcli: 1, alimentos: [{ codali: 16, qtd: 1 }] })}>CREATE</button>
        </>
      )}
    </div>
  )
}
