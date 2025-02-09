import { X } from "lucide-react";
import { Entregador } from "../../models/entregador/Entregador.model";
import { EntregadorDTO } from "../../models/entregador/Entregador.dto";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormEntregadorProps{

    entregador?:Entregador,
    closeForm: () => void,
    handleCreate?: (e:EntregadorDTO) => Promise<void>,
    handleUpdate?: (e: Entregador) => Promise<void>
}


export function FormEntregador({entregador, closeForm, handleCreate, handleUpdate}:FormEntregadorProps) {

  const [nome, setNome] = useState<string | undefined>(entregador?.nome || "")
  const [codger, setCodger] = useState<number | null>(entregador?.codger || null)
  const [cnh, setCnh] = useState<number | undefined>(entregador?.cnh || undefined)

  function handleNomeChange(e: ChangeEvent<HTMLInputElement>){
    setNome(e.target.value);
  }

  function handleCodgerChange(e: ChangeEvent<HTMLInputElement>){
    setCodger(+e.target.value);
  }

  function handleCnhChange(e: ChangeEvent<HTMLInputElement>){
    setCnh(+e.target.value);
  }

  async function submitForm(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    console.info(nome, codger, cnh)

    if(entregador){
      if(nome && cnh && handleUpdate){
        handleUpdate({codfun: entregador.codfun, nome, codger: codger || null, codent: entregador.codent, cnh})
      }
    } else {
      if(nome && cnh && handleCreate){
        handleCreate({nome, codger, cnh})
      }
    }

    closeForm();
  }
  
  return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 bg-light-gray space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-dark-blue font-semibold">{entregador ? "Atualizar" : "Criar"} Entregador</h2>
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
                placeholder="Nome do entregador"
                value={entregador && nome}
                onChange={handleNomeChange}
              />
            </div>
            <div>
              <span className="text-dark-blue">Código do Gerente: </span>
              <input
                name="codger"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none"
                type="number"
                placeholder="Código do Gerente"
                value={entregador && codger || undefined}
                onChange={handleCodgerChange}
              />
            </div>
            {(
              <div>
                <span className="text-dark-blue">CNH do Entregador: </span>
                <input
                  name="entregador"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none"
                  type="text"
                  placeholder="CNH do Entregador"
                  value={entregador && cnh}
                  onChange={handleCnhChange}
                />
              </div>
            )}
  
            <button className="bg-sat-blue text-light-gray pl-5 pr-5 pt-3 pb-3 rounded-xl" type="submit" disabled={(nome && cnh) ? false : true}>
              OK
            </button>
          </form>
  
        </div>
      </div>
    )

}