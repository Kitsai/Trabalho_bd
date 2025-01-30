import internal from "node:stream"

export interface AlimentoPedido {
  codAli: number,
  qtd: number
}
export interface PedidoCreateDTO {
  codCli: number | undefined,
  codMes: number | undefined,
  alimentos: AlimentoPedido[]
}
export interface PedidoEntregaCreateDTO {
  codCli: number,
  alimentos: AlimentoPedido[]
}

export interface PedidoSalaoCreateDTO {
  codMes: number,
  alimentos: AlimentoPedido[]
}

export interface PedidoUpdateDTO {

}

export interface PedidoEntregaUpdateDTO {
  codPedEnt: number,
  time: Date,
  codCli: number,
}

export interface PedidoSalaoUpdateDTO {
  codPedSal: number,
  time: Date,
  codMes: number
}

export interface PedidoResponseDTO {
  codPed: number,
  time: Date,
  codPedEnt: number | null | undefined,
  codCli: number | null | undefined,
  codPedSal: number | null | undefined,
  codMes: number | null | undefined
}
