import { DbClient } from "../database/dbClient";
import { PedidoEntregaCreateDTO, PedidoEntregaUpdateDTO } from "./pedido.dto";
import { Pedido, PedidoEntrega, PedidoSalao } from "./pedido.model";

export class PedidoService {
  private db: DbClient;

  public constructor() {
    this.db = DbClient.Instance;
  }

  public async getAll(): Promise<PedidoEntrega[]> {
    const query = `
      SELECT p.codPed, time, codPedEnt, codCli
      FROM pedido p
      JOIN pedido_Entrega pe ON p.codPed = pe.codPed;
    `;

    try {
      const res = await this.db.query(query);

      return res.rows;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async getById(id: number): Promise<PedidoEntrega> {
    const query = `
      SELECT p.codPed, time, codPedEnt, codCli
      FROM pedido p
      JOIN pedido_Entrega pe ON p.codPed = pe.codPed
      WHERE codPedEnt = $1;
    `
    try {
      const res = await this.db.query(query, [id]);
      return res.rows[0];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async delete(id: number) {
    const query = `
      DELETE FROM pedido 
      WHERE codPed = $1
      CASCADE
      RETURNING *;
    `
    try {
      const res = await this.db.query(query, [id]);
      return res.rows[0];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async create(ped: PedidoEntregaCreateDTO) {
    const queryBase = "INSERT INTO pedido(time) VALUES (now()) RETURNING *;";
    const queryEnt = "INSERT INTO pedido_entrega(codPed,codCli) VALUES ($1, $2);"
    const queryAli = "INSERT INTO pedido_alimento(codPed, codAli, qtd) VALUES ($1, $2, $3);"

    try {
      const resBase = await this.db.query(queryBase);
      const base: Pedido = resBase.rows[0]

      await this.db.query(queryEnt, [base.codPed, ped.codCli]);
      ped.alimentos.forEach(async (ali) => {
        await this.db.query(queryAli, [base.codPed, ali.codAli, ali.qtd])
      });
    } catch (e) {
      console.error(e)
      throw e;
    }
  }

  public async update(ped: PedidoEntregaUpdateDTO) {
    const query = `
      UPDATE pedido_entrega SET 
        codCli = $1
      WHERE codPedEnt = $2
      RETURNING *;
    `

    try {
      const res = await this.db.query(query, [ped.codCli, ped.codPedEnt])
      return res.rows[0];
    } catch (e) {
      console.error(e)
      throw e;
    }
  }
}
