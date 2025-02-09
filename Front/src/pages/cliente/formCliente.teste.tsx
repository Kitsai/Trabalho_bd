import { X } from "lucide-react";
import { Cliente } from "../../models/cliente/cliente.model";
import { ClienteDTO } from "../../models/cliente/cliente.dto";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";

interface FormClienteModalProps {
  cliente?: Cliente,
  closeForm: () => void,
  handleCreateForm?: (cl: ClienteDTO) => Promise<void>
  handleUpdateForm?: (cl: Cliente) => Promise<void>
}

export function FormCliente({ cliente, closeForm, handleCreateForm, handleUpdateForm }: FormClienteModalProps) {

  const [nome, setNome] = useState<string | undefined>(cliente?.nome || "")
  const [endereco, setEndereco] = useState<string | undefined>(cliente?.endereco || "")
  const [entregador, setEntregador] = useState<number | undefined>(cliente?.codent || undefined)

  function handleNomeChange(e: ChangeEvent<HTMLInputElement>) {
    setNome(e.target.value);
  }

  function handleEnderecoChange(e: ChangeEvent<HTMLInputElement>) {
    setEndereco(e.target.value);
  }

  function handleEntregadorChange(e: ChangeEvent<HTMLInputElement>) {
    setEntregador(+e.target.value)
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.info(nome, endereco)

    if (cliente) {
      nome && endereco && handleUpdateForm && handleUpdateForm({ codcli: cliente.codcli, nome, codent: entregador, codmes: cliente.codmes, endereco })
    } else {
      nome && endereco && handleCreateForm && handleCreateForm({ nome, endereco, codmes: undefined })
    }

    closeForm();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 bg-light-gray space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-dark-blue font-semibold">{cliente ? "Atualizar" : "Criar"} Cliente</h2>
          <button type='button' onClick={closeForm}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        <form className="space-y-3" onSubmit={submitForm}>
          <div>
            <span className="text-dark-blue">Nome: </span>
            <input
              name="nome"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none"
              type="text"
              placeholder="Nome do cliente"
              value={cliente && nome}
              onChange={handleNomeChange}
            />
          </div>
          <div>
            <span className="text-dark-blue">Endereco: </span>
            <input
              name="endereco"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none"
              type="text"
              placeholder="Endereco"
              value={cliente && endereco}
              onChange={handleEnderecoChange}
            />
          </div>
          {cliente && (
            <div>
              <span className="text-dark-blue">Codigo do Entregador: </span>
              <input
                name="entregador"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none"
                type="text"
                placeholder="Código do Entregador"
                value={entregador}
                onChange={handleEntregadorChange}
              />
            </div>
          )}

          <button className="bg-sat-blue text-light-gray pl-5 pr-5 pt-3 pb-3 rounded-xl" type="submit" disabled={(nome && endereco) ? false : true}>
            OK
          </button>
        </form>

      </div>
    </div>
  )
}
