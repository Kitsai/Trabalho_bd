import { writeFileSync } from "fs";
import { DbClient } from "../dbClient";

const db = DbClient.Instance;


async function testImage() {
  const res = await db.query("SELECT imagem FROM alimento WHERE codAli = 1;");

  const image: Uint8Array = res.rows[0].imagem;
  writeFileSync('test.png', image);
}

testImage()
