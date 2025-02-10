import { ComponentProps } from "react";
import { Entregador } from "../../models/entregador/Entregador.model";

interface EntregadorListItemProps extends ComponentProps<'li'> {
  entregador: Entregador
  openUpdate: (e: Entregador) => void,
  handleDelete: (id: number) => Promise<void>
}
export function EntregadorListItem({ entregador, openUpdate, handleDelete, ...props }: EntregadorListItemProps) {
  return (
    <li key={entregador.codent} className="bg-amber-50 p-5 flex justify-between items-center gap-x-12 my-3 rounded-xl">
      <div>
        <span className="text-dark-blue font-semibold">{entregador.codent} - {entregador.nome} - {entregador.cnh}</span>
      </div>
      <div className="flex justify-between space-x-4 items-baseline rounded-2xl text-dark-blue">
        <button
          className="bg-sat-blue text-light-gray p-1.5 rounded-xs shadow-2xs shadow-sat-blue hover:shadow-lg hover:shadow-sat-blue/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={() => openUpdate(entregador)}>
          Atualizar
        </button>

        <button
          className="bg-dark-blue text-light-gray p-1.5 rounded-xs shadow-2xs shadow-dark-blue hover:shadow-lg hover:shadow-dark-blue/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={() => handleDelete(entregador.codent)}>
          Deletar
        </button>
      </div>
    </li>
  )
}
