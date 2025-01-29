import { Router } from "express";
import { ClienteRouter } from "./cliente/cliente.controller";

export const routers = Router();

routers.use("/cliente", ClienteRouter);
