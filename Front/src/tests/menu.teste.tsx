import { useNavigate } from "react-router"

export function TesteMenu() {

  const navigate = useNavigate();

  return <div className="flex items-center ">
    <div className="flex items-center justify-around space-x-48">
      <button className="outline-red-50" onClick={() => { navigate('/test/cliente') }}>Cliente</button>
      <button className="outline-red-50" onClick={() => { navigate('/test/entrega') }}>Entrega</button>
      <button className="outline-red-50" onClick={() => { navigate('/test/entregador') }}>Entregador</button>
      <button className="outline-red-50" onClick={() => { navigate('/test/alimento') }}>Alimento</button>
    </div>
  </div>
}
