import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config();

export class DbClient {
  private static _instance: DbClient;

  private _pool: Pool;

  private constructor() {
    this._pool = new Pool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : undefined
    })
    console.log("Database pool created");
  }

  public async connect() {
    this._pool.connect();
  }

  public async query(q: string, v?: any[]) {
    return await this._pool.query(q, v);
  }

  public get pool() {
    return this._pool;
  };

  public static get Instance(): DbClient {
    if (!this._instance) this._instance = new DbClient();
    return DbClient._instance;
  }
}
