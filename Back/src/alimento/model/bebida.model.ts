import { Alimento } from "./alimento.model";

export interface Bebida extends Alimento {
  codBeb: number,
  qtd: number,
  codFor: number
}
