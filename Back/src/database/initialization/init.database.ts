import { initDatabaseData } from "./init.data"
import { DbClient } from "../dbClient";

export async function initDatabase() {
  await DbClient.Instance.connect();
  DbClient.Instance.pool.query(`
    CREATE TABLE fornecedores(
      codFor INT PRIMARY KEY,
      name VARCHAR
  );`
  ).then(() => console.log("Created fornecedores table"),(e) => console.log("Failed to create fornecedores table with "+e));
  await initDatabaseData();
}

initDatabase()
