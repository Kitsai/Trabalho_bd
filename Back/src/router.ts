import { Router } from "express";
import { ClienteRouter } from "./cliente/cliente.controller";
import { PedidoRouter } from "./pedido/pedido.controller";

export const routers = Router();

routers.use("/cliente", ClienteRouter);
routers.use("/pedido", PedidoRouter);
