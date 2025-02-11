import { X } from "lucide-react";
import { Cliente } from "../../models/cliente/cliente.model";
import { ClienteDTO } from "../../models/cliente/cliente.dto";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { Entregador } from "../../models/entregador/Entregador.model";

interface FormClienteModalProps {
  cliente?: Cliente,
  entregadores: Entregador[]
  closeForm: () => void,
  handleCreateForm?: (cl: ClienteDTO) => Promise<void>
  handleUpdateForm?: (cl: Cliente) => Promise<void>
}

export function FormCliente({ cliente, entregadores, closeForm, handleCreateForm, handleUpdateForm }: FormClienteModalProps) {

  const [nome, setNome] = useState<string>(cliente?.nome || "")
  const [endereco, setEndereco] = useState<string | undefined>(cliente?.endereco || "")
  const [entregador, setEntregador] = useState<number | undefined>(cliente?.codent || undefined)

  const [search, setSearch] = useState<string>(entregadores.find((e) => e.codent === cliente?.codent)?.nome || "")
  const [showDropdown, setShowDropdown] = useState(false)

  function handleNomeChange(e: ChangeEvent<HTMLInputElement>) {
    setNome(e.target.value);
  }

  function handleEnderecoChange(e: ChangeEvent<HTMLInputElement>) {
    setEndereco(e.target.value);
  }

  function handleEntSelect(entId: number, entName: string) {
    setEntregador(entId);
    setSearch(entName);
    setShowDropdown(false);
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
              <span className="text-dark-blue">Entregador: </span>
              <input
                name="entregador"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none"
                type="search"
                placeholder="Entregador"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              {showDropdown && search && (
                <ul className="absolute w-[640px] bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto mt-1">
                  {entregadores
                    .filter((c) =>
                      c.nome.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((c) => (
                      <li
                        key={c.codent}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleEntSelect(c.codent, c.nome)}>
                        {c.nome}
                      </li>
                    ))
                  }
                </ul>
              )}
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
