import { Router } from "express";
import { EntregadorService } from "./entregador.service";

export const EntregadorRouter = Router();

const service = new EntregadorService();

EntregadorRouter.get('/', async (_, res) => {
  service.getAll().then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
})

EntregadorRouter.get('/:id', async (req, res) => {
  service.getById(+req.params.id).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
})

EntregadorRouter.delete('/:id', async (req, res) => {
  service.delete(+req.params.id).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
})

EntregadorRouter.post('/', async (req, res) => {
  service.create(req.body).then(
    () => res.status(200).send(),
    (e) => res.status(500).send(e)
  );
})

EntregadorRouter.put('/', async (req, res) => {
  service.update(req.body).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
})
