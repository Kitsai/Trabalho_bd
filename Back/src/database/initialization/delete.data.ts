import { DbClient } from "../dbClient";

const db: DbClient = DbClient.Instance;

async function deleteTables() {

}


async function deleteFornecedores() {
  const query = `
    DROP TABLE fornecedor;
  `;

  db.query(query);
}

deleteTables()
