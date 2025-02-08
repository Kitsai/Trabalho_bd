import { ComponentProps } from "react";
import { Cliente } from "../../models/cliente/cliente.model";
import { useNavigate } from "react-router";

interface ClienteListItemProps extends ComponentProps<'li'> {
  cliente: Cliente,
  openUpdate: (c: Cliente) => void,
  handleDelete: (id: number) => Promise<void>
}

export function ClienteListItem({ cliente, openUpdate, handleDelete, ...props }: ClienteListItemProps) {
  const navigate = useNavigate()
  return (
    <li key={cliente.codcli} {...props} className="outline-zinc-950">
      <span className="rounded-l text-red-200 bg-pink-800 outline-zinc-900 size-64">{cliente.nome}</span>
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
