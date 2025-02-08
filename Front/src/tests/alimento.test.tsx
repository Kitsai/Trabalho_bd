import { useEffect } from "react";
import { useAlimento } from "../hooks/useAlimento"
import { Alimento } from "../models/alimento/alimento.model";

export function TesteAlimento() {
  const {
    data,
    loading,
    error,
    getAlimentos
  } = useAlimento();

  useEffect(() => {
    console.log(getAlimentos());
  }, [getAlimentos])

  return (
    <div className='bg-cyan-950'>
      <h1>Alimentos</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && Array.isArray(data) && (
        <ul>
          {
            data.map((alimento: Alimento) => <li key={alimento.codali}
              className="bg-purple-950 p-3 flex items-center justify-start gap-x-12">
              <div>
                <span><strong>{alimento.nome}</strong></span>
                <br />
                <span>R${alimento.preco}</span>
              </div>
              <img
                src={`data:image/png;base64,${alimento.imagem}`}
                alt="Alimento"
                className="w-20 h-20 object-cover"
              />
            </li>
            )
          }
        </ul>
      )}
    </div>
  )
}
