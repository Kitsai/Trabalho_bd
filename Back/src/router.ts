import { Router } from "express";
import { ClienteRouter } from "./cliente/cliente.controller";
import { EntregaRouter } from "./pedido/entrega.controller";

export const routers = Router();

routers.use("/cliente", ClienteRouter);
routers.use("/entrega", EntregaRouter);
