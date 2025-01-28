import { Router } from "express";
import { FornecedorService } from "../service/fornecedor.service";
import { Fornecedor } from "../model/fornecedor.model";

export const fornecedorRouter = Router();

const fornecedorService = new FornecedorService();

fornecedorRouter.get("/", async (_, res) => {
  const qRes = await fornecedorService.getAll();
  const rows: Fornecedor[] = qRes.rows;

  res.send(rows);
});

fornecedorRouter.get('/:id', async (req, res) => {
  const forn: number = +req.params.id;

  const qRes = await fornecedorService.getById(forn);
  const val: Fornecedor = qRes.rows[0];
  res.send(val);
});

fornecedorRouter.post('/', async (req, res) => {
  const body: Fornecedor = req.body;

  fornecedorService.create(body).then(
    (v) => res.send(v.rows[0]),
    (e) => res.send(e)
  );
});

fornecedorRouter.put('/:id', async (req, res) => {
  const id: number = +req.params.id;
  const body: Fornecedor = req.body;

  if (id !== body.codFor) res.send("Error id does not match");

  fornecedorService.update(body).then(
    (v) => res.send(v.rows[0]),
    (e) => res.send(e)
  );
})

fornecedorRouter.delete('/:id', async (req, res) => {
  const id: number = +req.params.id;

  fornecedorService.delete(id).then(
    (v) => res.send(v.rows[0]),
    (e) => res.send(e)
  );
});
