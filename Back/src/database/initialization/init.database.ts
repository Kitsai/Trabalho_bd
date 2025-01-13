import { initDatabaseData } from "./init.data"
import { DbClient } from "../dbClient";

export async function initDatabase() {
  await DbClient.Instance.connect();
  DbClient.Instance.pool.query(`
    CREATE TABLE fornecedor(
      codFor INT PRIMARY KEY,
      name VARCHAR
  );`
  ).then(() => console.log("Created fornecedor table"), (e) => console.log("Failed to create fornecedor table with " + e));
  await initDatabaseData();
}

initDatabase()
