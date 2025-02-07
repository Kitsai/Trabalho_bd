import { DbClient } from "../database/dbClient";
import { Alimento } from "./model/alimento.model";

export class AlimentoService {
  private db: DbClient;

  public constructor() {
    this.db = DbClient.Instance;
  }

  public async getDisp(): Promise<Alimento[]> {
    const query = `
      SELECT codali, nome, preco
      FROM alimentos_disp;    
    `
    try {
      const res = await this.db.query(query);
      return res.rows;
    } catch (e) {
      console.error(e)
      throw e;
    }

  }

  public async getAli(id: number): Promise<Alimento> {
    const query = `
      SELECT codAli, nome, preco, imagem
      FROM alimento
      WHERE codAli = $1;
    `
    try {
      const res = await this.db.query(query, [id]);
      return res.rows[0];
    } catch (e) {
      console.error(e)
      throw e;
    }
  }
}
