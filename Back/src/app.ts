import express from "express"
import cors from "cors"
import { routers } from "./router";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routers);

const port = 3000;

app.listen(port, () => {
  console.log("Aplicação rodando na porta: " + port);
});
