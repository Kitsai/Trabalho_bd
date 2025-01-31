export interface AlimentoPedido {
  codAli: number,
  qtd: number
}
export interface PedidoEntregaCreateDTO {
  codCli: number,
  alimentos: AlimentoPedido[]
}

export interface PedidoEntregaUpdateDTO {
  codPedEnt: number,
  time: Date,
  codCli: number,
}

export interface PedidoEntregaResponseDTO {
  codPed: number,
  time: Date,
  codPedEnt: number,
  codCli: number
}
