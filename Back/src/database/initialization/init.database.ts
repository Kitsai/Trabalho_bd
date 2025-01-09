import { initDatabaseData } from "./init.data";

export async function initDatabase() {
  await initDatabaseData();
}

initDatabase()
