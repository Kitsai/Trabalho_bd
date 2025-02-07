import { Router } from "express";
import { AlimentoService } from "./alimento.service";

export const AlimentoRouter = Router();

const service = new AlimentoService()

AlimentoRouter.get("/", (_, res) => {
  service.getDisp().then(
    (al) => res.status(200).send(al),
    (e) => res.status(500).send(e)
  )
});

AlimentoRouter.get("/:id", (req, res) => {
  service.getAli(+req.params.id).then(
    (al) => res.status(200).send(al),
    (e) => res.status(500).send(e)
  )
});
