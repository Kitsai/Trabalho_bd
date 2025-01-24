COPY fornecedor(nome)
FROM 'src/database/initialization/data/fornecedor.data.csv'
WITH(FORMAT CSV);
