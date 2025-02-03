import { Funcionario } from "./funcionario.model"

export interface Entregador extends Funcionario {
  codent: number,
  cnh: number
}
