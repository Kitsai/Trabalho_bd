import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route } from 'react-router'
import { Routes } from 'react-router'
import { Menu } from './pages/menu/menu.tsx'
import { TesteCliente } from './tests/cliente.test.tsx'
import { TesteAlimento } from './tests/alimento.test.tsx'
import { TesteEntrega } from './tests/entrega.teste.tsx'
import { TesteEntregador } from './tests/entregador.teste.tsx'
import { TesteMenu } from './tests/menu.teste.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Menu />} />
      <Route path='/test' element={<TesteMenu />} />
      <Route path='/cliente' element={<TesteCliente />} />
      <Route path='/alimentos' element={<TesteAlimento />} />
      <Route path='/entrega' element={<TesteEntrega />}></Route>
      <Route path='/entregador' element={<TesteEntregador />}></Route>
    </Routes>
  </BrowserRouter>,
)
