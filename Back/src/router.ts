import { Router } from "express";
import { fornecedorRouter } from "./fornecedor/controller/fornecedor.controller";

export const routers = Router();

routers.use("/fornecedor", fornecedorRouter);
