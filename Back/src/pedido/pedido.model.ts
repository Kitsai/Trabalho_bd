export interface PedidoAlimento {
  codali: number,
  qtd: number,
}
export interface Pedido {
  codped: number,
  time: Date,
  alimentos: PedidoAlimento[]
}

export interface PedidoSalao extends Pedido {
  codpedsal: number,
  codmes: number
}

export interface PedidoEntrega extends Pedido {
  codpedent: number,
  codcli: number
}

