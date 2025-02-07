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
      res.rows.map((ali: any) => {
        const imageData: Buffer = ali.imagem;

        ali.imagem = imageData.toString('base64')
      })
      return res.rows;
    } catch (e) {
      console.error(e)
      throw e;
    }
  }
}
