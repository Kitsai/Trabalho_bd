import { DbClient } from "../../database/dbClient";
import { Fornecedor } from "../model/fornecedor.model";

export class FornecedorService {
  private _db: DbClient;

  public constructor() {
    this._db = DbClient.Instance;
  }
  public async getAll() {
    return this._db.query("SELECT * FROM fornecedor ORDER BY codFor")
  }

  public async getById(id: number) {
    const query = `
      SELECT *
      FROM fornecedor
      WHERE codFor = $1;
    `;
    return this._db.query(query, [id]);
  }

  public async create(f: Fornecedor) {
    const query = `
      INSERT INTO fornecedor 
      VALUES($1,$2) 
      RETURNING *;
    `;

    return this._db.query(query, [f.codFor, f.name]);
  }

  public async update(f: Fornecedor) {
    const query = `
      UPDATE fornecedor 
      SET name = $1
      WHERE codFor = $2
      RETURNING *;
    `;

    return this._db.query(query, [f.name, f.codFor]);
  }

  public async delete(id: number) {
    const query = `
      DELETE FROM fornecedor
      WHERE codFor = $1
      RETURNING *;
    `;

    return this._db.query(query, [id]);
  }
}
