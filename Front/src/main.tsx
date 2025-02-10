import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route } from 'react-router'
import { Routes, Navigate } from 'react-router'
import { ClientePage } from './pages/cliente/cliente.page.tsx'
import { EntregaPage } from './pages/entrega/entrega.page.tsx'
import { EntregadorPage } from './pages/entregador/entregador.page.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to={'/entrega'} />} />

      <Route path='/cliente' element={<ClientePage />} />
      <Route path='/entrega' element={<EntregaPage />}></Route>
      <Route path='/entregador' element={<EntregadorPage />}></Route>
    </Routes>
  </BrowserRouter>,
)
