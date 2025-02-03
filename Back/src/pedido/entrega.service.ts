import { DbClient } from "../database/dbClient";
import { PedidoEntregaCreateDTO, PedidoEntregaUpdateDTO } from "./pedido.dto";
import { PedidoEntrega, PedidoAlimento } from "./pedido.model";

export class PedidoService {
  private db: DbClient;

  public constructor() {
    this.db = DbClient.Instance;
  }

  public async getAll(): Promise<PedidoEntrega[]> {
    const query1 = `
      SELECT p.codPed, time, codPedEnt, codCli
      FROM pedido p
      JOIN pedido_Entrega pe ON p.codPed = pe.codPed;
    `;

    const query2 = `
      SELECT codAli, qtd 
      FROM pedido_alimento 
      WHERE codPed = $1;
    `

    try {
      let res: PedidoEntrega[] = (await this.db.query(query1)).rows;
      for (let i = 0; i < res.length; i++) {
        res[i].alimentos = (await this.db.query(query2, [res[i].codped])).rows;
      }

      return res
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async getById(id: number): Promise<PedidoEntrega> {
    const query1 = `
      SELECT p.codPed, time, codPedEnt, codCli
      FROM pedido p
      JOIN pedido_Entrega pe ON p.codPed = pe.codPed
      WHERE codPedEnt = $1;
    `

    const query2 = `
      SELECT codAli, qtd 
      FROM pedido_alimento
      WHERE codPed = $1;
    `
    try {
      let res: PedidoEntrega = (await this.db.query(query1, [id])).rows[0];
      res.alimentos = (await this.db.query(query2, [res.codped])).rows;
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async delete(id: number): Promise<PedidoEntrega> {
    const query1 = `
      DELETE FROM pedido_entrega
      WHERE codPedEnt = $1 
      RETURNING *;
    `
    const query2 = `
      DELETE FROM pedido_alimento
      WHERE codPed = $1 
      RETURNING *;
    `
    const query3 = `
      DELETE FROM pedido 
      WHERE codPed = $1
      RETURNING *;
    `
    try {
      const res1 = (await this.db.query(query1, [id])).rows[0];
      if (res1 === undefined) throw { "message": "Pedido não encontrado" };
      const res2: PedidoAlimento[] = (await this.db.query(query2, [res1.codped])).rows;
      const res3 = (await this.db.query(query3, [res1.codped])).rows[0]

      return { codped: res1.codped, time: res1.time, codpedent: res3.codpedent, codcli: res3.codcli, alimentos: res2 };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async create(ped: PedidoEntregaCreateDTO): Promise<PedidoEntrega> {
    const queryBase = "INSERT INTO pedido(time) VALUES (now()) RETURNING *;";
    const queryEnt = "INSERT INTO pedido_entrega(codPed,codCli) VALUES ($1, $2) RETURNING *;"
    const queryAli = "INSERT INTO pedido_alimento(codPed, codAli, qtd) VALUES ($1, $2, $3) RETURNING codAli, qtd;"

    try {
      const resBase = (await this.db.query(queryBase)).rows[0];

      const resEnt = (await this.db.query(queryEnt, [resBase.codped, ped.codcli])).rows[0];

      let ret: PedidoEntrega = { codped: resBase.codped, time: resBase.time, codpedent: resEnt.codpedent, codcli: resEnt.codcli, alimentos: [] }

      for (let i = 0; i < ped.alimentos.length; i++) {
        const resAli: PedidoAlimento = (await this.db.query(queryAli, [resBase.codped, ped.alimentos[i].codali, ped.alimentos[i].qtd])).rows[0];
        ret.alimentos.push(resAli);
      };
      return ret;
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
      const res = await this.db.query(query, [ped.codcli, ped.codpedent])
      return res.rows[0];
    } catch (e) {
      console.error(e)
      throw e;
    }
  }
}
