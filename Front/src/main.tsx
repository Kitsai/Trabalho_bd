import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route } from 'react-router'
import { Routes } from 'react-router'
import { ClientePage } from './pages/cliente/cliente.page.tsx'
import { TesteAlimento } from './tests/alimento.test.tsx'
import { EntregaPage } from './pages/entrega/entrega.page.tsx'
import { EntregadorPage } from './pages/entregador/entregador.page.tsx'
import { TesteMenu } from './tests/menu.teste.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<TesteMenu />} />
      <Route path='/cliente' element={<ClientePage />} />
      <Route path='/alimentos' element={<TesteAlimento />} />
      <Route path='/entrega' element={<EntregaPage />}></Route>
      <Route path='/entregador' element={<EntregadorPage />}></Route>
    </Routes>
  </BrowserRouter>,
)
