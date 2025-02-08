import { Router } from "express";
import { ClienteService } from "./cliente.service";
import { Cliente } from "./cliente.model";
import { ClienteDTO } from "./cliente.dto";

export const ClienteRouter = Router();

const service = new ClienteService();

ClienteRouter.get('/', (_, res) => {
  console.info('GET ON /cliente')
  service.getAll().then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
});

ClienteRouter.get('/:id', (req, res) => {
  const id = +req.params.id;
  console.info('GET ON /cliente', id)

  service.getById(id).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
});

ClienteRouter.post('/', (req, res) => {
  const cli: ClienteDTO = req.body;
  console.info('POST ON /cliente', cli)
  service.create(cli).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
});

ClienteRouter.put('/', (req, res) => {
  const cli: Cliente = req.body;
  console.info('PUT ON /cliente', cli)

  service.update(cli).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
});

ClienteRouter.delete('/:id', (req, res) => {
  const id = +req.params.id;
  console.info('DELETE ON /cliente', id)
  service.delete(id).then(
    (cl) => res.status(200).send(cl),
    (e) => res.status(500).send(e)
  );
});
