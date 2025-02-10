import { X } from "lucide-react"
import { PedidoEntregaCreateDTO, PedidoEntregaUpdateDTO } from "../../models/entrega/entrega.dto"
import { ChangeEvent, FormEvent, useState } from "react"
import { Cliente } from "../../models/cliente/cliente.model"
import { Alimento } from "../../models/alimento/alimento.model"
import { PedidoAlimento } from "../../models/entrega/entrega.model"

interface FormEntregaModalProps {
  entrega?: PedidoEntregaUpdateDTO,
  closeForm: () => void,
  clientes: Cliente[],
  alimentos: Alimento[],
  handleCreateForm?: (pe: PedidoEntregaCreateDTO) => Promise<void>,
  handleUpdateForm?: (pe: PedidoEntregaUpdateDTO) => Promise<void>
}
export function FormEntrega({ entrega, closeForm, clientes, alimentos, handleCreateForm, handleUpdateForm }: FormEntregaModalProps) {
  const nome = clientes.find((c) => (c.codcli === entrega?.codcli))?.nome;
  const [codcli, setCodCli] = useState<number | null>(entrega?.codcli || null)
  const [time, setTime] = useState<string>(entrega?.time || "")
  const [search, setSearch] = useState<string>(nome || "")
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [selectedAlimentos, setSelectedAlimentos] = useState<Alimento[]>([])

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    setTime(e.target.value)
  }

  function handleCienteSelect(clientId: number, clientName: string) {
    setCodCli(clientId)
    setSearch(clientName)
    setShowDropdown(false)
  }

  function handleAlimentoSelect(alimento: Alimento) {
    setSelectedAlimentos((prev) => {
      const isSelected = prev.some((a) => a.codali === alimento.codali);
      if (isSelected) {
        return prev.filter((a) => a.codali !== alimento.codali);
      } else {
        return [...prev, alimento];
      }
    })
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.info(selectedAlimentos, codcli)

    if (entrega) {
      if (codcli && time && handleUpdateForm)
        handleUpdateForm({ codpedent: entrega.codpedent, codcli, time })
    } else {
      if (codcli && handleCreateForm)
        handleCreateForm({ codcli, alimentos: selectedAlimentos.map((a): PedidoAlimento => { return { codali: a.codali, qtd: 1 } }) })
    }
    closeForm()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 bg-light-gray space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-dark-blue font-semibold">{entrega ? "Atualizar" : "Criar"} Entrega</h2>
          <button type="button" onClick={closeForm}>
            <X className="size-5 text-zinc-400 hover:text-zinc-950 hover:cursor-pointer" />
          </button>
        </div>
        <form className="space-y-3" onSubmit={submitForm}>
          <div>
            <span className="text-dark-blue">Cliente: </span>
            <input
              name="cli"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none"
              type="search"
              placeholder="Cliente"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
            />
            {showDropdown && search && (
              <ul className="absolute w-[640px] bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto mt-1">
                {clientes
                  .filter((c) =>
                    c.nome.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((c) => (
                    <li
                      key={c.codcli}
                      className="px-3 py2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleCienteSelect(c.codcli, c.nome)}>
                      {c.nome}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          {entrega ? (
            <div className="space-x-2">
              <span className="text-dark-blue">Data e hora do pedido:</span>
              <input
                name="data"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none"
                type="datetime-local"
                placeholder="Hora do pedido"
                value={time ? new Date(time).toISOString().slice(0, 16) : ""}
                onChange={handleDateChange}
              />
            </div>
          ) : (
            <div>
              <span className="text-dark-blue">Alimentos:</span><br />
              <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
                <div className="grid grid-cols-2 gap-2">
                  {alimentos.map((alimento) => (
                    <label key={alimento.codali} className="flex items-center space-x-2 cursor-pointer border p-2 rounded-lg hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedAlimentos.some((a) => a.codali === alimento.codali)}
                        onChange={() => handleAlimentoSelect(alimento)}
                      />
                      <img src={`data:image/png;base64,${alimento.imagem}`} alt={alimento.nome} className="w-10 h-10 object-cover rounded" />
                      <span>{alimento.nome} - R$ {alimento.preco.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
          <button className="cursor-pointer bg-sat-blue text-light-gray px-5 py-3 rounded-xl disabled:cursor-default disabled:bg-sat-blue/50" type="submit" disabled={(!entrega && selectedAlimentos.length === 0) || codcli === null}>
            OK
          </button>
        </form>
      </div>
    </div>
  )
}
