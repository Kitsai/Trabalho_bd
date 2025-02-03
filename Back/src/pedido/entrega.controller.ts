import { Router } from "express";
import { PedidoService } from "./entrega.service";
import { PedidoEntregaCreateDTO, PedidoEntregaUpdateDTO } from "./pedido.dto";

export const EntregaRouter = Router();
const service = new PedidoService();

EntregaRouter.get("/", (_, res) => {
  service.getAll().then(
    (pe) => res.status(200).send(pe),
    (e) => res.status(500).send(e)
  );
})

EntregaRouter.get("/:id", (req, res) => {
  const id = +req.params.id;
  service.getById(id).then(
    (pe) => res.status(200).send(pe),
    (e) => res.status(500).send(e)
  );
})

EntregaRouter.delete("/:id", (req, res) => {
  const id = +req.params.id;
  service.delete(id).then(
    (pe) => res.status(200).send(pe),
    (e) => res.status(500).send(e)
  );
})


EntregaRouter.post("/", (req, res) => {
  const pe: PedidoEntregaCreateDTO = req.body;

  service.create(pe).then(
    (pe) => res.status(200).send(pe),
    (e) => res.status(500).send(e)
  );
})

EntregaRouter.put("/", (req, res) => {
  const pe: PedidoEntregaUpdateDTO = req.body;
  console.info(pe)

  service.update(pe).then(
    (pe) => res.status(200).send(pe),
    (e) => res.status(500).send(e)
  );
})
