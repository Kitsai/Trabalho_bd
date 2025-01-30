export interface Pedido {
  codPed: number,
  time: Date,
}

export interface PedidoSalao extends Pedido {
  codPedSal: number,
  codMes: number
}

export interface PedidoEntrega extends Pedido {
  codPedEnt: number,
  codCli: number
}

