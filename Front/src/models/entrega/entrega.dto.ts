import { PedidoAlimento } from "./entrega.model"

export interface PedidoEntregaCreateDTO {
  codcli: number,
  alimentos: PedidoAlimento[]
}

export interface PedidoEntregaUpdateDTO {
  codpedent: number,
  time: string,
  codcli: number,
}
