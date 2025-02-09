import { ComponentProps } from "react"
import { PedidoEntrega } from "../models/entrega/entrega.model"
import { PedidoAlimento } from "../models/entrega/entrega.model"
import { Cliente } from "../models/cliente/cliente.model"
import { Alimento } from "../models/alimento/alimento.model"

interface EntregaListItemProps extends ComponentProps<'li'> {
  entrega: PedidoEntrega,
  clientes: Cliente[],
  alimentos: Alimento[],
  openUpdate: (e: PedidoEntrega) => void,
  handleDelete: (id: number) => Promise<void>
}

export function EntregaListItem({ entrega, clientes, alimentos, openUpdate, handleDelete, ...props }: EntregaListItemProps) {
  return (
    <li key={entrega.codpedent} {...props} className="outline-zinc-950 bg-amber-50 my-2 p-5 flex justify-start gap-x-12 rounded-2xl flex-col">
      <div className="flex justify-between items-center">
        <span><strong>{entrega.codpedent} - {clientes.find((c) => { return c.codcli === entrega.codcli })?.nome} - {new Date(entrega.time).toLocaleString()}</strong></span>
        <div className="flex justify-between space-x-4 items-baseline rounded-2xl">
          <button
            className="hover:cursor-pointer outline-dark-blue text-dark-blue outline-1 p-1"
            onClick={() => openUpdate(entrega)}>Atualizar</button>
          <button
            className="hover:cursor-pointer outline-dark-blue text-dark-blue outline-1 p-1"
            onClick={() => handleDelete(entrega.codpedent)}>Deletar</button>
        </div>
      </div>
      <ul className="flex ml-12 mr-12 flex-col gap-y-2" >
        {entrega.alimentos.map((ali: PedidoAlimento) => {
          return (
            <li>
              <span>{alimentos.find((a) => (a.codali === ali.codali))?.nome}</span> - <span>{ali.qtd}</span>
            </li>
          )
        }
        )}
      </ul>
    </li>
  )
}
