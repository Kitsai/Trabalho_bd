import { ComponentProps } from "react";
import { Entregador } from "../../models/entregador/Entregador.model";

interface EntregadorListItemProps extends ComponentProps<'li'> {
  entregador: Entregador
  openUpdate: (e: Entregador) => void,
  handleDelete: (id: number) => Promise<void>
}
export function EntregadorListItem({ entregador, openUpdate, handleDelete, ...props }: EntregadorListItemProps) {
  return (
    <li key={entregador.codent} {...props} className="outline-zinc950 bg-amber-50 my-2 p-5 rounded-2xl">
      <div>
        <div className="space-x-3">
          <span><strong>{entregador.codent} - {entregador.nome} - {entregador.cnh}</strong></span>
          <div className="flex justify-around items-baseline rounded-2xl">
            <button className="hover:cursor-pointer outline-black outline-1" onClick={() => openUpdate(entregador)}>Atualizar</button>
            <button className="hover:cursor-pointer outline-black outline-1" onClick={() => handleDelete(entregador.codent)}>Deletar</button>
          </div>
        </div>
      </div>
    </li>
  )
}
