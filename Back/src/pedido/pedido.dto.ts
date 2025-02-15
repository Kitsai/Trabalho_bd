import { PedidoAlimento } from "./pedido.model"

export interface PedidoEntregaCreateDTO {
  codcli: number,
  alimentos: PedidoAlimento[]
}

export interface PedidoEntregaUpdateDTO {
  codpedent: number,
  time: Date,
  codcli: number,
}
