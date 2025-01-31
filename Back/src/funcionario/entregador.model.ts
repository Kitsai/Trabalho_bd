import { Funcionario } from "./funcionario.model"

export interface Entregador extends Funcionario {
  codEnt: number,
  cnh: number
}
