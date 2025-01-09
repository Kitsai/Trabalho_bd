import { DbClient } from "../../database/dbClient";
import { Fornecedor } from "../model/fornecedor.model";

export class FornecedorService {
  private _db: DbClient;

  public constructor() {
    this._db = DbClient.Instance;
  }
  public async getAll() {
    return this._db.pool.query("SELECT * FROM fornecedor");
  }
}
