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
    const query1 = `
      DELETE FROM entregador WHERE codEnt = $1 RETURNING *;
    `;
    const query2 = `
      DELETE FROM funcionario WHERE codFun = $1 RETURNING *;
    `
    try {
      const res1 = (await this.db.query(query1, [id])).rows[0];
      const res2 = (await this.db.query(query2, [res1.codfun])).rows[0];

      return { codfun: res1.codfun, codger: res1.codger, nome: res1.nome, codent: res2.codent, cnh: res2.cnh }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async create(f: EntregadorDTO): Promise<Entregador> {
    const query1 = `
      INSERT INTO funcionario(nome, codGer) VALUES ($1, $2) RETURNING *;
    `
    const query2 = `
      INSERT INTO entregador(codFun, cnh) VALUES ($1, $2) RETURNING *;
    `

    try {
      const res1 = (await this.db.query(query1, [f.nome, f.codger])).rows[0];
      const res2 = (await this.db.query(query2, [res1.codfun, f.cnh])).rows[0];


      return { codfun: res1.codfun, nome: res1.nome, codger: res1.codger, codent: res2.codent, cnh: res2.cnh }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async update(f: Entregador): Promise<Entregador> {
    const query1 = ` 
      UPDATE entregador SET 
        cnh = $1 
      WHERE codent = $2
      RETURNING *;
    `

    const query2 = `
      UPDATE funcionario SET 
        nome = $1,
        codGer = $2 
      WHERE codFun = $3
      RETURNING *;
    `

    try {
      const res1 = (await this.db.query(query1, [f.cnh, f.codent])).rows[0];
      const res2 = (await this.db.query(query2, [f.nome, f.codger, res1.codfun])).rows[0];

      return { codfun: res1.codfun, nome: res1.nome, codger: res1.codger, codent: res2.codent, cnh: res2.cnh }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

