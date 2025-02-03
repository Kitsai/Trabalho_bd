export interface PedidoAlimento {
  codali: number,
  qtd: number,
}
export interface Pedido {
  codped: number,
  time: Date,
  alimentos: PedidoAlimento[]
}

export interface PedidoEntrega extends Pedido {
  codpedent: number,
  codcli: number
}
