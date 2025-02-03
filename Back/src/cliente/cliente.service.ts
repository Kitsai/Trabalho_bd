import { DbClient } from "../database/dbClient";
import { ClienteDTO } from "./cliente.dto";
import { Cliente } from "./cliente.model";

export class ClienteService {
  private db: DbClient;

  public constructor() {
    this.db = DbClient.Instance;
  }

  public async getAll(): Promise<Cliente[]> {
    const query = `
      SELECT *
      FROM cliente;
    `;
    try {
      let val = await this.db.query(query);

      return val.rows
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async getById(id: number): Promise<Cliente> {
    const query = `
      SELECT *
      FROM cliente 
      WHERE codCli = $1;
    `;

    try {
      let val = await this.db.query(query, [id]);

      return val.rows[0];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async create(cl: ClienteDTO): Promise<Cliente> {
    const query = `
      INSERT INTO cliente(
        nome,
        endereco,
        codMes
      ) VALUES (
        $1,
        $2,
        $3
      )
      RETURNING *;
    `;

    try {
      const res = await this.db.query(query, [cl.nome, cl.endereco, cl.codmes]);

      return res.rows[0];
    } catch (e) {
      console.error(e);
      throw (e);
    }
  }

  public async delete(id: number): Promise<Cliente> {
    const query = `
      DELETE FROM cliente
      WHERE codCli = $1
      RETURNING *;
    `
    try {
      const res = await this.db.query(query, [id]);
      return res.rows[0];
    } catch (e) {
      console.error(e);
      throw (e);
    }
  }

  public async update(cl: Cliente): Promise<Cliente> {
    const query = `
      UPDATE cliente SET 
        nome = $1,
        endereco = $2,
        codMes = $3,
        codEnt = $4
      WHERE codCli = $5;
    `;

    try {
      const res = await this.db.query(query, [cl.nome, cl.endereco, cl.codmes, cl.codent, cl.codcli]);
      return res.rows[0];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

