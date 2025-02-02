import { Router } from "express";
import { EntregadorService } from "./entregador.service";

export const EntregadorRouter = Router();

const service = new EntregadorService();

EntregadorRouter.get('/', (_, res) => {
  service.getAll().then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
})

EntregadorRouter.get('/:id', (req, res) => {
  service.getById(+req.params.id).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
})

EntregadorRouter.delete('/:id', (req, res) => {
  service.delete(+req.params.id).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
})

EntregadorRouter.post('/', (req, res) => {
  service.create(req.body).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
})

EntregadorRouter.put('/', (req, res) => {
  service.update(req.body).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
})
