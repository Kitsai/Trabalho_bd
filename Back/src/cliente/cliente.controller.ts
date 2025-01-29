import { Router } from "express";
import { ClienteService } from "./cliente.service";
import { Cliente } from "./cliente.model";
import { ClienteDTO } from "./cliente.dto";

export const ClienteRouter = Router();

const service = new ClienteService();

ClienteRouter.get('/', (_, res) => {
  service.getAll().then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
});

ClienteRouter.get('/:id', (req, res) => {
  const id = +req.params.id;

  service.getById(id).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
});

ClienteRouter.post('/', (req, res) => {
  const cli: ClienteDTO = req.body;
  service.create(cli).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
});

ClienteRouter.put('/', (req, res) => {
  const cli: Cliente = req.body;
  service.update(cli).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
});

ClienteRouter.delete('/:id', (req, res) => {
  const id = +req.params.id;
  service.delete(id).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
});
