import { DbClient } from "../database/dbClient";
import { PedidoCreateDTO, PedidoEntregaCreateDTO, PedidoResponseDTO, PedidoSalaoCreateDTO } from "./pedido.dto";
import { Pedido, PedidoEntrega, PedidoSalao } from "./pedido.model";

export class PedidoService {
  private db: DbClient;

  public constructor() {
    this.db = DbClient.Instance;
  }

  public async getAll(): Promise<PedidoResponseDTO[]> {
    const query = `
      SELECT p.codPed, time, codPedEnt, codCli, codPedSal, codMes
      FROM pedido p
      LEFT JOIN pedido_Entrega pe ON p.codPed = pe.codPed
      LEFT JOIN pedido_Salao ps ON p.codPed = ps.codPed;
    `
    try {
      const res = await this.db.query(query);

      return res.rows;
    } catch (e) {
      console.error(e)
      throw e;
    }
  }

  public async getAllEnt(): Promise<PedidoEntrega[]> {
    const query = `
      SELECT p.codPed, time, codPedEnt, codCli
      FROM pedido p
      JOIN pedido_Entrega pe ON p.codPed = pe.codPed;
    `;

    try {
      const res = await this.db.query(query);

      return res.rows;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async getAllSal(): Promise<PedidoSalao[]> {
    const query = `
      SELECT p.codPed, time, codPedSal, codMes
      FROM pedido p
      JOIN pedido_Salao ps ON p.codPed = ps.codPed;`;

    try {
      const res = await this.db.query(query);
      return res.rows;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async getById(id: number): Promise<PedidoResponseDTO> {
    const query = `
      SELECT p.codPed, time, codPedEnt, codCli, codPedSal, codMes
      FROM pedido p
      LEFT JOIN pedido_Entrega pe ON p.codPed = pe.codPed
      LEFT JOIN pedido_Salao ps ON p.codPed = ps.codPedSal
      WHERE p.codPed = $1;
    `
    try {
      const res = await this.db.query(query, [id]);
      return res.rows[0];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async getByIdEnt(id: number): Promise<PedidoEntrega> {
    const query = `
      SELECT p.codPed, time, codPedEnt, codCli
      FROM pedido p
      JOIN pedido_Entrega pe ON p.codPed = pe.codPed
      WHERE codPedEnt = $1;
    `
    try {
      const res = await this.db.query(query, [id]);
      return res.rows[0];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async getByIdSal(id: number): Promise<PedidoSalao> {
    const query = `
      SELECT p.codPed, time, codPedSal, codMes
      FROM pedido p
      JOIN pedido_Salao ps ON p.codPed = ps.codPed
      WHERE codPedSal = $1;
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
      DELETE FROM pedido 
      WHERE codPed = $1
      CASCADE
      RETURNING *;
    `
    try {
      const res = await this.db.query(query, [id]);
      return res.rows[0];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async create(ped: PedidoCreateDTO) {
    const queryBase = `
      INSERT INTO pedido(time) 
      VALUES (now())
      RETURNING *;
    `
    const querySpe = (ped.codCli === undefined && ped.codMes !== undefined)
      ? "INSERT INTO pedido_Salao(codPed, codMes) VALUES ($1,$2) RETURNING *;"
      : "INSERT INTO pedido_Entrega(codPed, codCli) VALUES ($1, $2) RETURNING *;";

    const queryAli = "INSERT INTO pedido_alimento(codPed, codAli, qtd) VALUES ($1, $2, $3) RETURNING *;"

    try {
      const resBase = await this.db.query(queryBase);
      const base: Pedido = resBase.rows[0]

      const cod = (ped.codCli === undefined && ped.codMes !== undefined) ? ped.codMes : ped.codCli;
      await this.db.query(querySpe, [base.codPed, cod]);

      ped.alimentos.forEach(async (ali) => {
        await this.db.query(queryAli, [base.codPed, ali.codAli, ali.qtd])
      })
    } catch (e) {
      console.error(e)
      throw e;
    }
  }

  public async createEntrega(ped: PedidoEntregaCreateDTO) {
    const queryBase = "INSERT INTO pedido(time) VALUES (now()) RETURNING *;";
    const queryEnt = "INSERT INTO pedido_entrega(codPed,codCli) VALUES ($1, $2);"
    const queryAli = "INSERT INTO pedido_alimento(codPed, codAli, qtd) VALUES ($1, $2, $3);"

    try {
      const resBase = await this.db.query(queryBase);
      const base: Pedido = resBase.rows[0]

      await this.db.query(queryEnt, [base.codPed, ped.codCli]);
      ped.alimentos.forEach(async (ali) => {
        await this.db.query(queryAli, [base.codPed, ali.codAli, ali.qtd])
      });
    } catch (e) {
      console.error(e)
      throw e;
    }
  }

  public async createSalao(ped: PedidoSalaoCreateDTO) {
    const queryBase = "INSERT INTO pedido(time) VALUES (now()) RETURNING *;";
    const queryEnt = "INSERT INTO pedido_salao(codPed,codMes) VALUES ($1, $2);"
    const queryAli = "INSERT INTO pedido_alimento(codPed, codAli, qtd) VALUES ($1, $2, $3);"

    try {
      const resBase = await this.db.query(queryBase);
      const base: Pedido = resBase.rows[0]

      await this.db.query(queryEnt, [base.codPed, ped.codMes]);
      ped.alimentos.forEach(async (ali) => {
        await this.db.query(queryAli, [base.codPed, ali.codAli, ali.qtd])
      });
    } catch (e) {
      console.error(e)
      throw e;
    }
  }

}
