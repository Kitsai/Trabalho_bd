import { Router } from "express";
import { ClienteRouter } from "./cliente/cliente.controller";
import { EntregaRouter } from "./pedido/entrega.controller";
import { EntregadorRouter } from "./funcionario/entregador.controller";
import { AlimentoRouter } from "./alimento/alimento.controller";

export const routers = Router();

routers.use("/cliente", ClienteRouter);
routers.use("/entrega", EntregaRouter);
routers.use("/entregador", EntregadorRouter);
routers.use("/alimentos", AlimentoRouter);
