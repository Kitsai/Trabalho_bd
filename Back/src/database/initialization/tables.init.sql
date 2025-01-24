CREATE TABLE fornecedor(
  codFor SERIAL PRIMARY KEY,
  nome VARCHAR NOT NULL
);

CREATE TABLE ingrediente(
  codIng SERIAL PRIMARY KEY,
  nome VARCHAR NOT NULL,
  qtd INT NOT NULL DEFAULT 0,
  codFor INT NOT NULL, 
  
  CONSTRAINT fk_ingrediente_fornecedor 
  FOREIGN KEY (codFor)
  REFERENCES fornecedor(codFor)
);

CREATE TABLE embalagem(
  codEmb SERIAl PRIMARY KEY,
  nome VARCHAR NOT NULL,
  qtd INT NOT NULL DEFAULT 0,
  codFor INT NOT NULL, 
  
  CONSTRAINT fk_embalagem_fornecedor 
  FOREIGN KEY (codFor)
  REFERENCES fornecedor(codFor)
);

CREATE TABLE louca(
  codLou SERIAl PRIMARY KEY,
  nome VARCHAR NOT NULL,
  qtd INT NOT NULL DEFAULT 0,
  codFor INT NOT NULL, 
  
  CONSTRAINT fk_louca_fornecedor 
  FOREIGN KEY (codFor)
  REFERENCES fornecedor(codFor)
);

CREATE TABLE alimento(
    codAli SERIAL PRIMARY KEY,
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
  codBeb SERIAL PRIMARY KEY,
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
  codSob SERIAL PRIMARY KEY,
  codAli INT NOT NULL,

  CONSTRAINT fk_sobremesa_alimento
  FOREIGN KEY (codAli)
  REFERENCES alimento(codAli)
);

CREATE TABLE prato(
  codPra SERIAL PRIMARY KEY,
  codAli INT NOT NULL,

  CONSTRAINT fk_prato_alimento
  FOREIGN KEY (codAli)
  REFERENCES alimento(codAli)
);

CREATE TABLE hamburguer(
  codHam SERIAL PRIMARY KEY,
  codAli INT NOT NULL,

  CONSTRAINT fk_hamburguer_alimento
  FOREIGN KEY (codAli)
  REFERENCES alimento(codAli)
);

CREATE TABLE funcionario(
  codFun SERIAL PRIMARY KEY,
  nome VARCHAR NOT NULL,
  codGer INT,

  CONSTRAINT fk_funcionario_gerente
  FOREIGN KEY (codGer)
  REFERENCES funcionario(codFun)
);

CREATE TABLE garcom(
  codGar SERIAL PRIMARY KEY,
  codFun INT,

  CONSTRAINT fk_garcom_funcionario
  FOREIGN KEY (codFun)
  REFERENCES funcionario(codFun)
);

CREATE TABLE entregador(
  codEnt SERIAL PRIMARY KEY,
  codFun INT,
  cnh INT,

  CONSTRAINT fk_entregador_funcionario
  FOREIGN KEY (codFun)
  REFERENCES funcionario(codFun)
);

CREATE TABLE mesa(
  codMes SERIAL PRIMARY KEY,
  nome CHAR(1),
  nLugares INT,
  reservada BOOL,
  codGar INT,

  CONSTRAINT fk_mesa_garcom
  FOREIGN KEY (codGar)
  REFERENCES garcom(codGar)
);

CREATE TABLE cliente(
  codCli SERIAL PRIMARY KEY,
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
  codPed SERIAL PRIMARY KEY,
  time TIMESTAMP WITH TIME ZONE DEFAULT NOW() 
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

CREATE TABLE pedido_salao(
  codPedSal SERIAL PRIMARY KEY,
  codPed INT NOT NULL,
  codMes INT NOT NULL,

  CONSTRAINT fk_pedido_salao_pedido
  FOREIGN KEY (codPed)
  REFERENCES pedido(codPed),

  CONSTRAINT fk_pedido_salao_mesa
  FOREIGN KEY (codMes)
  REFERENCES mesa(codMes)
);

CREATE TABLE pedido_entrega(
  codPedEnt SERIAL PRIMARY KEY,
  codPed INT NOT NULL,
  codCli INT NOT NULL,

  CONSTRAINT fk_pedido_entrega_pedido
  FOREIGN KEY (codPed)
  REFERENCES pedido(codPed),

  CONSTRAINT fk_pedido_entrega_cliente
  FOREIGN KEY (codCli)
  REFERENCES cliente(codCli)
);
