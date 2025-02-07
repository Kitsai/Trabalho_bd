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

  getAlimentos()

  return (
    <div className='bg-cyan-950'>
      <h1>Alimentos</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && Array.isArray(data) && (
        <ul>
          {
            data.map((alimento: Alimento) =>
              <li key={alimento.codali} className="bg-purple-950 p-16 flex items-center justify-between">
                <div>
                  <span><strong>{alimento.nome}</strong></span>
                  <br />
                  <span>R${alimento.preco}</span>
                </div>
              </li>
            )
          }
        </ul>
      )}
    </div>
  )
}
