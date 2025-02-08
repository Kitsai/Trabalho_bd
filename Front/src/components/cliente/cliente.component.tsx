import { ComponentProps } from "react";
import { Cliente } from "../../models/cliente/cliente.model";

interface ClienteListItemProps extends ComponentProps<'li'> {
  cliente: Cliente,
  openUpdate: (c: Cliente) => void,
  handleDelete: (id: number) => Promise<void>
}

export function ClienteListItem({ cliente, openUpdate, handleDelete, ...props }: ClienteListItemProps) {
  return (
    <li key={cliente.codcli} {...props} className="outline-zinc-950 bg-amber-50 my-2 p-5 rounded-2xl">
      <span className="rounded-l text-black outline-zinc-900 size-64">{cliente.nome}</span>
      <br />
      <span>  {cliente.endereco}</span>
      <span>{cliente.codent}</span>
      <div className="flex justify-around items-baseline rounded-2xl">
        <button className='hover:cursor-grab outline-black outline-1' onClick={() => { openUpdate(cliente) }}>Editar</button>
        <button className='hover:cursor-grab outline-black outline-1' onClick={() => { handleDelete(cliente.codcli) }}>Deletar</button>
      </div>
    </li >
  )
}
