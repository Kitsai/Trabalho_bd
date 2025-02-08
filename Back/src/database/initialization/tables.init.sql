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
  ON DELETE SET NULL
);

CREATE TABLE embalagem(
  codEmb SERIAl PRIMARY KEY,
  nome VARCHAR NOT NULL,
  qtd INT NOT NULL DEFAULT 0,
  codFor INT NOT NULL, 
  
  CONSTRAINT fk_embalagem_fornecedor 
  FOREIGN KEY (codFor)
  REFERENCES fornecedor(codFor)
  ON DELETE SET NULL
);

CREATE TABLE louca(
  codLou SERIAl PRIMARY KEY,
  nome VARCHAR NOT NULL,
  qtd INT NOT NULL DEFAULT 0,
  codFor INT NOT NULL, 
  
  CONSTRAINT fk_louca_fornecedor 
  FOREIGN KEY (codFor)
  REFERENCES fornecedor(codFor)
  ON DELETE SET NULL
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
  REFERENCES embalagem(codEmb)
  ON DELETE SET NULL,

  CONSTRAINT fk_alimento_louca
  FOREIGN KEY (codLou)
  REFERENCES louca(codLou)
  ON DELETE SET NULL
);

CREATE TABLE alimento_ingrediente(
  codAli INT,
  codIng INT,
  qtd INT DEFAULT 1,

  PRIMARY KEY(codAli, codIng),

  CONSTRAINT fk_alimento_ingrediente_alimento
  FOREIGN KEY (codAli)
  REFERENCES alimento(codAli)
  ON DELETE CASCADE,

  CONSTRAINT fk_alimento_ingrediente_ingrediente
  FOREIGN KEY (codIng)
  REFERENCES ingrediente(codIng)
  ON DELETE CASCADE
);

CREATE TABLE bebida(
  codBeb SERIAL PRIMARY KEY,
  qtd INT,
  codAli INT NOT NULL,
  codFor INT,

  CONSTRAINT fk_bebida_alimento
  FOREIGN KEY (codAli)
  REFERENCES alimento(codAli)
  ON DELETE CASCADE,

  CONSTRAINT fk_bebida_fornecedor
  FOREIGN KEY (codFor)
  REFERENCES fornecedor(codFor)
  ON DELETE SET NULL
);

CREATE TABLE sobremesa(
  codSob SERIAL PRIMARY KEY,
  codAli INT NOT NULL,

  CONSTRAINT fk_sobremesa_alimento
  FOREIGN KEY (codAli)
  REFERENCES alimento(codAli)
  ON DELETE CASCADE
);

CREATE TABLE prato(
  codPra SERIAL PRIMARY KEY,
  codAli INT NOT NULL,

  CONSTRAINT fk_prato_alimento
  FOREIGN KEY (codAli)
  REFERENCES alimento(codAli)
  ON DELETE CASCADE
);

CREATE TABLE hamburguer(
  codHam SERIAL PRIMARY KEY,
  codAli INT NOT NULL,

  CONSTRAINT fk_hamburguer_alimento
  FOREIGN KEY (codAli)
  REFERENCES alimento(codAli)
  ON DELETE CASCADE
);

CREATE TABLE funcionario(
  codFun SERIAL PRIMARY KEY,
  nome VARCHAR NOT NULL,
  codGer INT,

  CONSTRAINT fk_funcionario_gerente
  FOREIGN KEY (codGer)
  REFERENCES funcionario(codFun)
  ON DELETE SET NULL
);

CREATE TABLE garcom(
  codGar SERIAL PRIMARY KEY,
  codFun INT NOT NULL,

  CONSTRAINT fk_garcom_funcionario
  FOREIGN KEY (codFun)
  REFERENCES funcionario(codFun)
  ON DELETE CASCADE
);

CREATE TABLE entregador(
  codEnt SERIAL PRIMARY KEY,
  codFun INT NOT NULL,
  cnh INT,

  CONSTRAINT fk_entregador_funcionario
  FOREIGN KEY (codFun)
  REFERENCES funcionario(codFun)
  ON DELETE CASCADE
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
  ON DELETE SET NULL
);

CREATE TABLE cliente(
  codCli SERIAL PRIMARY KEY,
  nome VARCHAR NOT NULL,
  endereco VARCHAR,
  codMes INT,
  codEnt INT,

  CONSTRAINT fk_cliente_mesa 
  FOREIGN KEY (codMes)
  REFERENCES mesa(codMes)
  ON DELETE SET NULL,

  CONSTRAINT fk_cliente_entregador
  FOREIGN KEY (codEnt)
  REFERENCES entregador(codEnt)
  ON DELETE SET NULL
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
  REFERENCES pedido(codPed)
  ON DELETE CASCADE,

  CONSTRAINT fk_pedido_alimento_alimento
  FOREIGN KEY (codAli)
  REFERENCES alimento(codAli)
  ON DELETE CASCADE
);

CREATE TABLE pedido_salao(
  codPedSal SERIAL PRIMARY KEY,
  codPed INT NOT NULL,
  codMes INT NOT NULL,

  CONSTRAINT fk_pedido_salao_pedido
  FOREIGN KEY (codPed)
  REFERENCES pedido(codPed)
  ON DELETE CASCADE,

  CONSTRAINT fk_pedido_salao_mesa
  FOREIGN KEY (codMes)
  REFERENCES mesa(codMes)
  ON DELETE CASCADE
);

CREATE TABLE pedido_entrega(
  codPedEnt SERIAL PRIMARY KEY,
  codPed INT NOT NULL,
  codCli INT NOT NULL,

  CONSTRAINT fk_pedido_entrega_pedido
  FOREIGN KEY (codPed)
  REFERENCES pedido(codPed)
  ON DELETE CASCADE,

  CONSTRAINT fk_pedido_entrega_cliente
  FOREIGN KEY (codCli)
  REFERENCES cliente(codCli)
  ON DELETE CASCADE
);

CREATE OR REPLACE VIEW alimentos_disp AS
SELECT *
FROM alimento a
WHERE (
	SELECT bool_and(ai.qtd <= i.qtd) disp
	FROM alimento_ingrediente ai
	JOIN ingrediente i ON i.codIng = ai.codIng
	WHERE ai.codAli = a.codAli
)
OR (
	SELECT bool_and(b.qtd > 0)
	FROM bebida b
	WHERE b.codAli = a.codAli
)
ORDER BY codAli;

CREATE OR REPLACE PROCEDURE reestocar()
LANGUAGE plpgsql
AS $$
	DECLARE
		ingCur CURSOR FOR SELECT codIng FROM ingrediente;
		louCur CURSOR FOR SELECT codLou FROM louca;
		embCur CURSOR FOR SELECT codEmb FROM embalagem;
		bebCur CURSOR FOR SELECT codBeb FROM bebida;
	BEGIN
		FOR ing IN ingCur LOOP
			UPDATE ingrediente SET
				qtd = 10
			WHERE codIng = ing.codIng;
		END LOOP;
		
		FOR lou IN louCur LOOP
			UPDATE louca SET
				qtd = 10
			WHERE codLou = lou.codLou;
		END LOOP;
			
		FOR emb IN embCur LOOP
			UPDATE embalagem SET
				qtd = 10
			WHERE codEmb = emb.codEmb;
		END LOOP;
	
		FOR beb IN bebCur LOOP
			UPDATE bebida SET
				qtd = 10
			WHERE codBeb = beb.codBeb;
		END LOOP;
	END;
$$;
