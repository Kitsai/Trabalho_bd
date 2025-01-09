# REQUISITOS
As tecnologias necessárias para rodar o projeto são:
- nodejs
- npm
- docker

Com essas tecnologias instaladas será possível instalar as outras dependencias do projeto

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
Para o back precisamos do docker para rodar o postgres em um container  facilitando a sua instalação.
para inicial o banco temos que configurar o .env e então usar o comando:
```bash
docker compose up
```
estando na pasta do projeto do back.

para rodar o back podemos usar o comando
```bash
 npm run dev
```

## Front
O front não depende de uma tecnologia externa logo para rodar é apenas usar o comando
```bash
 npm run dev
```
