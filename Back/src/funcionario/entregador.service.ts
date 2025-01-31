import { DbClient } from "../database/dbClient";
import { Entregador } from "./entregador.model";

export class EntregadorService {
  private db: DbClient;

  public constructor() {
    this.db = DbClient.Instance;
  }

  public async getAll(): Promise<Entregador[]> {
    const query = `
      SELECT codEnt, e.codFun, cnh, nome, codger
      FROM entregador e
      JOIN funcionario f ON e.codFun = f.codFun;
    `

    try {
      const res = await this.db.query(query);
      return res.rows;
    } catch (e) {
      console.error(e)
      throw e;
    }
  }
}
