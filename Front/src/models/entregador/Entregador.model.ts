export interface Funcionario {
  codfun: number,
  nome: string,
  codger: number | null
}

export interface Entregador extends Funcionario {
  codent: number,
  cnh: number
}
