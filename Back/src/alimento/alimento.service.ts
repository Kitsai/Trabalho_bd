import { DbClient } from "../database/dbClient";
import { Alimento } from "./model/alimento.model";

export class AlimentoService {
  private db: DbClient;

  public constructor() {
    this.db = DbClient.Instance;
  }

  public async getDisp(): Promise<Alimento[]> {
    const query = `
      SELECT codali, nome, preco, imagem
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
}
