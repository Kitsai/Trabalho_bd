import { Router } from "express";

export const fornecedorRouter = Router();

fornecedorRouter.get("/", (_, res) => {
  res.send("Rota fornecedor"); 
})
