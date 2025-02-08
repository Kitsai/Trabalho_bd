import { PersonStanding } from "lucide-react"
import { useNavigate } from "react-router"

export function NavBar() {
  const navigate = useNavigate()
  return (
    <div className="flex flex1 items-center justify-center p-3 bg-zinc-900 text-gray-300 text-xl">
      <div className="flex gap-x-12">
        <button onClick={() => navigate('/cliente')}>Cliente</button>
        <button onClick={() => navigate('/entrega')}>Entrega</button>
        <button onClick={() => navigate('/entregador')}>Entregador</button>
      </div>
    </div>
  )
}

