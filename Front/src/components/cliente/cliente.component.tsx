import { ComponentProps } from "react";
import { Cliente } from "../../models/cliente/cliente.model";
import { Entregador } from "../../models/entregador/Entregador.model";

interface ClienteListItemProps extends ComponentProps<'li'> {
  cliente: Cliente,
  entregadores: Entregador[],
  loadingEnt: boolean,
  openUpdate: (c: Cliente) => void,
  handleDelete: (id: number) => Promise<void>
}

export function ClienteListItem({ cliente, entregadores, loadingEnt, openUpdate, handleDelete, ...props }: ClienteListItemProps) {
  return (
    <li key={cliente.codcli} {...props} className="outline-zinc-950 bg-amber-50 my-2 p-5 rounded-2xl flex justify-between items-center">
      <div className="items-center">
        <span className="rounded-l text-black outline-zinc-900 size-64">{cliente.nome}</span>
        <br />
        <div className="flex gap-x-8">
          {cliente.endereco && <span>Endereço: {cliente.endereco}</span>}
          <span>{(loadingEnt ? (
            "..."
          ) : (
            entregadores.find((e) => e.codent === cliente.codent)?.nome || ""
          ))}</span>
        </div>
      </div>
      <div className="flex justify-between space-x-4 items-baseline rounded-2xl">

        <button className='hover:cursor-grab bg-sat-blue text-light-gray p-1.5 rounded-xs shadow-2xs shadow-sat-blue hover:shadow-lg hover:shadow-sat-blue/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          onClick={() => { openUpdate(cliente) }}>
          Editar
        </button>

        <button className='hover:cursor-grab bg-dark-blue text-light-gray p-1.5 rounded-xs shadow-2xs shadow-dark-blue hover:shadow-lg hover:shadow-dark-blue/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          onClick={() => { handleDelete(cliente.codcli) }}>
          Deletar
        </button>

      </div>
    </li >
  )
}
