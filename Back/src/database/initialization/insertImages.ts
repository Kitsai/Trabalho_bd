import { readFileSync } from "node:fs";
import { DbClient } from "../dbClient";

const db = DbClient.Instance;

export async function insertImages() {
  const res = await db.query("SELECT COUNT(*) FROM alimento;");
  const n: number = res.rows[0].count;

  console.info(n)

  const query = `
    UPDATE alimento SET 
      imagem = $1
    WHERE codAli = $2;
  `;
  for (let i = 1; i <= n; i++) {
    const image = new Uint8Array(readFileSync('src/database/initialization/data/images/' + i + '.png'));

    db.query(query, [image, i]).catch((e) => console.error(e));
  }
}

insertImages()
