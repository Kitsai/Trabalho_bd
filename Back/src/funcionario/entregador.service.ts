import { DbClient } from "../database/dbClient";
import { EntregadorDTO } from "./entregador.dto";
import { Entregador } from "./entregador.model";
import { Funcionario } from "./funcionario.model";

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

  public async getById(id: number): Promise<Entregador> {
    const query = `
      SELECT codEnt, e.codFun, cnh, nome, codger
      FROM entregador e
      JOIN funcionario f ON e.codFun = f.codFun
      WHERE codEnt = $1;
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
      DO $$
        DECLARE 
          id INT;
        BEGIN
          DELETE FROM entregador WHERE codEnt = ${id} RETURNING codFun INTO id;
          DELETE FROM funcionario WHERE codFun = id;
        END;
      $$
    `;

    try {
      await this.db.query(query);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async create(f: EntregadorDTO) {
    const query = `
      DO $$
        DECLARE 
          id INT;
        BEGIN
          INSERT INTO funcionario(nome, codGer) VALUES ('${f.nome}', ${f.codGer}) RETURNING codFun INTO id;
          INSERT INTO entregador(codFun, cnh) VALUES (id, ${f.cnh});
        END;
      $$;
    `
    try {
      await this.db.query(query)
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async update(f: Entregador): Promise<Entregador> {
    const queryBase = `
      UPDATE entregador SET 
        cnh = $1 
      WHERE codEnt = $2;
      `
    const queryFun = `
      UPDATE funcionario SET 
        nome = $1,
        codGer = $2
      WHERE codFun = $3;
    `

    try {
      await this.db.query(queryBase, [f.cnh, f.codEnt]);
      await this.db.query(queryFun, [f.nome, f.codGer, f.codFun]);
      return f;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
