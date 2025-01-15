import { DbClient } from "../dbClient";

const db = DbClient.Instance;

async function deleteTables() {
  await deletePedidos();
  await deleteCliente();
  await deleteMesa();
  await deleteFuncionario();
  await deleteAlimento();
  await deleteIngrediente();
  await deleteEmbalagem();
  await deleteLouca();
  await deleteFornecedor();
}

async function deletePedidos() {
  const query1 = "DROP TABLE pedido_alimento;";
  const query2 = "DROP TABLE pedido;";

  await db.query(query1).catch((e) => console.error(e));
  await db.query(query2).catch((e) => console.error(e));
}

async function deleteCliente() {
  const query = "DROP TABLE cliente;";

  await db.query(query).catch((e) => console.error(e));
}

async function deleteMesa() {
  const query = "DROP TABLE mesa;";

  await db.query(query).catch((e) => console.error(e));
}

async function deleteFuncionario() {
  const query1 = "DROP TABLE garcom;";
  const query2 = "DROP TABLE entregador;";
  const query3 = "DROP TABLE funcionario;";

  await db.query(query1).catch((e) => console.error(e));
  await db.query(query2).catch((e) => console.error(e));
  await db.query(query3).catch((e) => console.error(e));
}

async function deleteAlimento() {
  const query1 = "DROP TABLE hamburguer;";
  const query2 = "DROP TABLE prato;";
  const query3 = "DROP TABLE sobremesa;";
  const query4 = "DROP TABLE bebida;";
  const query5 = "DROP TABLE alimento_ingrediente;";
  const query6 = "DROP TABLE alimento;";

  await db.query(query1).catch((e) => console.error(e));
  await db.query(query2).catch((e) => console.error(e));
  await db.query(query3).catch((e) => console.error(e));
  await db.query(query4).catch((e) => console.error(e));
  await db.query(query5).catch((e) => console.error(e));
  await db.query(query6).catch((e) => console.error(e));
}

async function deleteIngrediente() {
  const query = "DROP TABLE ingrediente;";

  await db.query(query).catch((e) => console.error(e));
}

async function deleteEmbalagem() {
  const query = "DROP TABLE embalagem;";

  await db.query(query).catch((e) => console.error(e));
}

async function deleteLouca() {
  const query = "DROP TABLE louca;";

  await db.query(query).catch((e) => console.error(e));
}

async function deleteFornecedor() {
  const query = "DROP TABLE fornecedor;";

  await db.query(query).catch((e) => console.error(e));
}

deleteTables();
