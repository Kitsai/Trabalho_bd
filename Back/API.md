# Descrição da api do backend

## Cliente

### GET /cliente

Recupera todos os clientes retornando uma lista do tipo **Cliente**.

### GET /cliente/:id

Recupera um cliente especifico pelo seu id.
Esse id deve ser passado como parametro na própria url.

### POST /cliente

Cria um novo cliente as únicas informações que devem ser passadas no body,
uma vez que estamos lidando com entregas, são:

- nome - string
- endereco - string

Esses tipos estão na interface ClienteDTO.
Ele retorna o cliente criado.

### PUT /cliente

Atualiza um cliente existente.
É uma rota simples que recebe um cliente e atualiza ele.
Logo deve ser enviado um objeto do tipo **Cliente** no body do req
com as alterações desejadas.

### DELETE /cliente/:id

Deleta um cliente.
Assim como a de busca de cliente unico apenas precisa
do id(codcli) passado na própria url.

## Entregador

### GET /entregador

Recupera todos os entregadores retornando uma lista do tipo **Entregador**.

### GET /entregador/:id

Recupera um entregador especifico pelo seu id nesse caso sendo a coluna *codent*.
Esse id deve ser passado como parametro na própria url.

### POST /entregador

Cria um novo entregador, as únicas informações que devem ser passadas no body,
uma vez que estamos lidando com entregas, são:

- nome - string
- codger - number
- cnh - number

Esses tipos estão na interface EntregadorDTO.
Ele retorna o entregador criado.

### PUT /entregador

Atualiza um entregador existente.
É uma rota simples que recebe um Entregador e atualiza ele.
Logo deve ser enviado um objeto do tipo **Entregador** no body do req
com as alterações desejadas.

### DELETE /entregador/:id

Deleta um Entregador.
Assim como a de busca de entregador unico apenas precisa
do id(codent) passado na própria url.

## Entrega

Está é a rota mais complexa sendo:

### GET /entrega

Recupera todos as entregas retornando uma lista do tipo **PedidoEntrega**.

### GET /entrega/:id

Recupera uma entrega especifica pelo seu id nesse caso sendo a coluna *codpedent*.
Esse id deve ser passado como parametro na própria url.

### POST /entrega

Cria uma nova entrega, as únicas informações que devem ser passadas no body,
uma vez que estamos lidando com entregas, são:

- codcli - number
- alimentos - array
  - codali - number
  - qtd - number

Esses tipos estão na interface **PedidoEntregaCreateDTO**.
A lista alimetos contém todos os alimentos presentes no pedido
usando a interface PedidoAlimento
Ele retorna o entregador criado.

### PUT /entrega

Atualiza uma entrega existente.
Diferente das outras para simplificar essa rota
não recebe um **PedidoEntrega** e sim um **PedidoEntregaUpdateDTO**
essa interface contém as seguintes propriedades:

- codpedent - number(id do pedido para ser atualizado)
- time - Date(data do pedido)
- codcli - number(cliente que fez o pedido)

### DELETE /entrega/:id

Deleta uma Entrega.
Assim como a de busca de entrega unica apenas precisa
do id(codpedent) passado na própria url.
