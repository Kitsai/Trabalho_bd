import fs from 'fs'
import { parse } from 'csv-parse';
import { DbClient } from '../dbClient';
import { Fornecedor } from '../../fornecedor/model/fornecedor.model';

const path = process.cwd() + '/src/database/initialization/data/';
const db = DbClient.Instance;

export async function initDatabaseData() {
  initFornecedores();
}

async function initFornecedores() {
  const pT = fs.readFileSync(path + "fornecedor.data.csv");
  const query = `
  INSERT INTO fornecedor
  VALUES ($1, $2)
  RETURNING *;
  `;
  parse(pT, { delimiter: ',', columns: ['codFor', 'nome'] }, (e, res: Fornecedor[]) => {
    if (e) console.error(e);
    else {
      res.forEach(({ codFor, nome }) => {
        db.query(query, [codFor, nome]).then(
          (r) => console.log("Fornecedor " + r + "foi inserido"),
          (e) => console.log("Erro ao inserir com " + e)
        );
      })
    }
  });
}

initDatabaseData()
