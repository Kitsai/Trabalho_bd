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

