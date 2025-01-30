import { Router } from "express";
import { PedidoService } from "./pedido.service";

export const PedidoRouter = Router();
const service = new PedidoService();

PedidoRouter.get("/", (_, res) => {
  service.getAll().then(
    (pe) => res.status(200).send(pe),
    (e) => res.status(500).send(e)
  );
})

PedidoRouter.get("/entrega", (_, res) => {
  service.getAllEnt().then(
    (pe) => res.status(200).send(pe),
    (e) => res.status(500).send(e)
  );
});

PedidoRouter.get("/salao", (_, res) => {
  service.getAllSal().then(
    (ps) => res.status(200).send(ps),
    (e) => res.status(500).send(e)
  );
})

