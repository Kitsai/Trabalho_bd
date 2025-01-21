COPY fornecedor(codFor,nome)
FROM './data/fornecedor.data.csv'
WITH(FORMAT CSV);

COPY ingrediente(codIng, nome, qtd, codFor)
FROM './data/ingrediente.data.csv'
WITH(FORMAT CSV)
