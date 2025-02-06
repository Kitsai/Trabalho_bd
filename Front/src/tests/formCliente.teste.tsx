import { X } from "lucide-react";
import { Cliente } from "../models/cliente/cliente.model";
import { ClienteDTO } from "../models/cliente/cliente.dto";
import { FormEvent } from "react";

interface FormClienteModalProps {
  cliente?: Cliente,
  closeForm: () => void,
  handleForm: (cl: Cliente | ClienteDTO) => Promise<void>
}

export function FormCliente({ cliente, closeForm, handleForm }: FormClienteModalProps) {

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const nome = data.get('nome')?.toString();
    const endereco = data.get('endereco')?.toString();

    if (cliente) {

    } else {
      handleForm({ nome, endereco })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{cliente ? "Atualizar" : "Criar"} Cliente</h2>
          <button type='button' onClick={closeForm}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        <form className="space-y-3">
          <div>
            <span>Nome: </span>
            <input
              name="nome"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none"
              type="text"
              placeholder="Nome do cliente"
              value={cliente && cliente.nome}
            />
          </div>
          <div>
            <span>Endereco: </span>
            <input
              name="endereco"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none"
              type="text"
              placeholder="Endereco"
              value={cliente && cliente.endereco}
            />
          </div>
          {cliente && (
            <div>
              <span>codEnt: </span>
              <input
                name="entregador"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none"
                type="text"
                value={cliente.codent}
              />
            </div>
          )}

          <button type="submit">
            OK
          </button>
        </form>

      </div>
    </div>
  )
}
