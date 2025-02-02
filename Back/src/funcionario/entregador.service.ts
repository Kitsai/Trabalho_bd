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

  public async delete(id: number): Promise<Entregador> {
    const query = `
      DELETE FROM funcionario
      WHERE codFun = (SELECT codFun FROM entregador WHERE codEnt = $1)
      RETURNING *;
    `;

    try {
      const res = await this.db.query(query, [id]);
      return res.rows[0];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async create(f: EntregadorDTO): Promise<Entregador> {
    const queryBase = `
      INSERT INTO funcionario(nome, codGer) VALUES ($1, $2) RETURNING *;
    `
    const queryEnt = `
      INSERT INTO entregador(codFun, cnh) VALUES ($1, $2) RETURNING *;
    `
    try {
      const res1: Funcionario = (await this.db.query(queryBase, [f.nome, f.codGer])).rows[0];
      const res2 = (await this.db.query(queryEnt, [res1.codFun, f.cnh])).rows[0];

      return { codFun: res1.codFun, codGer: res1.codGer, nome: res1.nome, codEnt: res2.codEnt, cnh: res2.cnh }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async update(f: Entregador): Promise<Entregador> {
    const query = `
      UPDATE entregador SET 
        cnh = $1 
      WHERE codEnt = $2;

      UPDATE funcionario SET 
        nome = $3,
        codGer = $4
      WHERE codFun = $5;
    `

    try {
      const res = await this.db.query(query, [f.cnh, f.codEnt, f.nome, f.codGer, f.codFun]);
      return f;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
