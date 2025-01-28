# REQUISITOS

As tecnologias necessárias para rodar o projeto são:

- nodejs
- npm
- docker

Com essas tecnologias instaladas
será possível instalar as outras dependencias do projeto

## Geral

Para ambos os projetos precisaremos do typescript logo se deve rodar

```bash
 npm i -g typescript
```

Além disso em ambas as pastas do projeto é preciso rodar:

```bash
 npm i
```

para instalar as dependencias de cada projeto.

## Back

Para o back precisamos do docker para rodar o postgres em um container  
facilitando a sua instalação.
para inicial o banco temos que configurar o .env e então usar o comando:

```bash
docker compose up
```

estando na pasta do projeto do back.

Com os conteiners docker iniciados podemos inicializar o banco
então temos que rodar os seguintes comandos em ordem na primeira vez:

```bash
npm run db:first
```

para rodar o back podemos usar o comando

```bash
 npm run dev
```

Caso queira entrar no banco de dados é possivel usar o comando:

```bash
npm run db:login
```

que irá iniciar o cli do postgres mas também é possível acessar o endereço
<http://localhost:8081>
para acessar o pgadmin
lá deve ser usado o login **<admin@admin.com>** e senha **password**

no primeiro uso também será preciso cadastrar o banco de dados.
para isso clique em adicionar servidor e coloque qualquer nome. Na aba de conexao
em host coloque o nome do servico docker **db**
em *maintenance database* coloque **Restaurante-bd**
e por fim em username e password coloque o que voce definiu no seu .env

## Front

O front não depende de uma tecnologia externa logo para rodar é apenas usar o comando

```bash
 npm run dev
```
