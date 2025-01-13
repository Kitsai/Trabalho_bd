import fs from 'fs'
import { DbClient } from '../dbClient';
import { Fornecedor } from '../../fornecedor/model/fornecedor.model';

const path = process.cwd() + '/src/database/initialization/data/';
const db = DbClient.Instance;

async function initFornecedores() {
  const pT = fs.readFileSync(path + 'fornecedor.data.json', 'utf-8');
  const data: [Fornecedor] = JSON.parse(pT);
  const query = `
  INSERT INTO fornecedor
  VALUES ($1, $2)
  RETURNING *;
  `;
  data.forEach((row) => {
    db.query(query, [row.codFor, row.name]).then(
      (r) => console.log("Fornecedor " + r + "foi inserido"),
      (e) => console.log("Erro ao inserir com " + e)
    );
  });
}

export async function initDatabaseData() {
  initFornecedores();
}

initDatabaseData()
