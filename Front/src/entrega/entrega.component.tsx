import { ComponentProps } from "react"
import { PedidoEntrega } from "../models/entrega/entrega.model"
import { PedidoEntregaUpdateDTO } from "../models/entrega/entrega.dto"
import { PedidoAlimento } from "../models/entrega/entrega.model"

interface EntregaListItemProps extends ComponentProps<'li'> {
  entrega: PedidoEntrega,
  openUpdate: (e: PedidoEntregaUpdateDTO) => void,
  handleDelete: (id: number) => Promise<void>
}

export function EntregaListItem({ entrega, openUpdate, handleDelete, ...props }: EntregaListItemProps) {
  return (
    <li key={entrega.codpedent} {...props} className="outline-zinc-950 bg-amber-50 my-2 p-5 flex items-center justify-start gap-x-12 rounded-2xl">
      <div className="space-x-3">
        <span><strong>{entrega.codpedent} - {entrega.codcli} - {entrega.time.toString()}</strong></span>
        <button onClick={() => openUpdate({ codpedent: entrega.codpedent, codcli: entrega.codcli, time: entrega.time })}>Atualizar</button>
        <button onClick={() => handleDelete(entrega.codpedent)}>Deletar</button>
      </div>
      <div className="flex ml-12 mr-12 flex-col gap-y-2" >
        {entrega.alimentos.map((ali: PedidoAlimento) => {
          return (
            <div>
              <span>{ali.codali}</span> - <span>{ali.qtd}</span>
            </div>
          )
        }
        )}
      </div>
    </li>
  )
}
