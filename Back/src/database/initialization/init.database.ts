import { initDatabaseData } from "./init.data"
import { DbClient } from "../dbClient";

const db: DbClient = DbClient.Instance;

export async function initDatabase() {
  await DbClient.Instance.connect();

  initTables();
}

// OK
async function initTables() {
  const query = `
    CREATE TABLE fornecedor(
      codFor INT PRIMARY KEY,
      nome VARCHAR NOT NULL
    );

    CREATE TABLE ingrediente(
      codIng INT PRIMARY KEY,
      nome VARCHAR NOT NULL,
      qtd INT NOT NULL DEFAULT 0,
      codFor INT NOT NULL, 
      
      CONSTRAINT fk_ingrediente_fornecedor 
      FOREIGN KEY (codFor)
      REFERENCES fornecedor(codFor)
    );

    CREATE TABLE embalagem(
      codEmb INT PRIMARY KEY,
      nome VARCHAR NOT NULL,
      qtd INT NOT NULL DEFAULT 0,
      codFor INT NOT NULL, 
      
      CONSTRAINT fk_embalagem_fornecedor 
      FOREIGN KEY (codFor)
      REFERENCES fornecedor(codFor)
    );

    CREATE TABLE louca(
      codLou INT PRIMARY KEY,
      nome VARCHAR NOT NULL,
      qtd INT NOT NULL DEFAULT 0,
      codFor INT NOT NULL, 
      
      CONSTRAINT fk_louca_fornecedor 
      FOREIGN KEY (codFor)
      REFERENCES fornecedor(codFor)
    );

    CREATE TABLE alimento(
        codAli INT PRIMARY KEY,
        nome VARCHAR NOT NULL,
        preco REAL NOT NULL,
        imagem BYTEA,
        codEmb INT NOT NULL,
        codLou INT NOT NULL,
        
        CONSTRAINT fk_alimento_embalagem
        FOREIGN KEY (codEmb)
        REFERENCES embalagem(codEmb),

        CONSTRAINT fk_alimento_louca
        FOREIGN KEY (codLou)
        REFERENCES louca(codLou)
      );

    CREATE TABLE alimento_ingrediente(
      codAli INT,
      codIng INT,
      qtd INT DEFAULT 1,

      PRIMARY KEY(codAli, codIng),

      CONSTRAINT fk_alimento_ingrediente_alimento
      FOREIGN KEY (codAli)
      REFERENCES alimento(codAli),

      CONSTRAINT fk_alimento_ingrediente_ingrediente
      FOREIGN KEY (codIng)
      REFERENCES ingrediente(codIng)
    );

    CREATE TABLE bebida(
      codBeb INT PRIMARY KEY,
      qtd INT,
      codAli INT NOT NULL,
      codFor INT,
      
      CONSTRAINT fk_bebida_alimento
      FOREIGN KEY (codAli)
      REFERENCES alimento(codAli),

      CONSTRAINT fk_bebida_fornecedor
      FOREIGN KEY (codFor)
      REFERENCES fornecedor(codFor)
    );

    CREATE TABLE sobremesa(
      codSob INT PRIMARY KEY,
      codAli INT NOT NULL,

      CONSTRAINT fk_sobremesa_alimento
      FOREIGN KEY (codAli)
      REFERENCES alimento(codAli)
    );

    CREATE TABLE prato(
      codPra INT PRIMARY KEY,
      codAli INT NOT NULL,

      CONSTRAINT fk_prato_alimento
      FOREIGN KEY (codAli)
      REFERENCES alimento(codAli)
    );

    CREATE TABLE hamburguer(
      codHam INT PRIMARY KEY,
      codAli INT NOT NULL,

      CONSTRAINT fk_hamburguer_alimento
      FOREIGN KEY (codAli)
      REFERENCES alimento(codAli)
    );

    CREATE TABLE funcionario(
      codFun INT PRIMARY KEY,
      nome VARCHAR NOT NULL,
      codGer INT,

      CONSTRAINT fk_funcionario_gerente
      FOREIGN KEY (codGer)
      REFERENCES funcionario(codFun)
    );

    CREATE TABLE garcom(
      codGar INT PRIMARY KEY,
      codFun INT,

      CONSTRAINT fk_garcom_funcionario
      FOREIGN KEY (codFun)
      REFERENCES funcionario(codFun)
    );

    CREATE TABLE entregador(
      codEnt INT PRIMARY KEY,
      codFun INT,
      cnh INT,

      CONSTRAINT fk_entregador_funcionario
      FOREIGN KEY (codFun)
      REFERENCES funcionario(codFun)
    );

    CREATE TABLE mesa(
      codMes INT PRIMARY KEY,
      nome VARCHAR,
      nLugares INT,
      reservada BOOL,
      codGar INT,

      CONSTRAINT fk_mesa_garcom
      FOREIGN KEY (codGar)
      REFERENCES garcom(codGar)
    );

    CREATE TABLE cliente(
      codCli INT PRIMARY KEY,
      nome VARCHAR NOT NULL,
      endereco VARCHAR,
      codMes INT,
      codEnt INT,

      CONSTRAINT fk_cliente_mesa 
      FOREIGN KEY (codMes)
      REFERENCES mesa(codMes),

      CONSTRAINT fk_cliente_entregador
      FOREIGN KEY (codEnt)
      REFERENCES entregador(codEnt)
    );
    
    CREATE TABLE pedido(
      codPed INT PRIMARY KEY,
      entrega BOOL NOT NULL DEFAULT FALSE,
      time TIMESTAMP WITH TIME ZONE DEFAULT NOW(), 
      codCli INT,

      CONSTRAINT fk_pedido_cliente
      FOREIGN KEY (codCli)
      REFERENCES cliente(codCli)
    );

    CREATE TABLE pedido_alimento(
      codPed INT,
      codAli INT,
      qtd INT NOT NULL DEFAULT 1,
      
      PRIMARY KEY(codPed, codAli),

      
      CONSTRAINT fk_pedido_alimento_pedido
      FOREIGN KEY (codPed)
      REFERENCES pedido(codPed),

      CONSTRAINT fk_pedido_alimento_alimento
      FOREIGN KEY (codAli)
      REFERENCES alimento(codAli)
    );
  `;

  await db.query(query).catch((e) => console.error(e));
}

initDatabase()
