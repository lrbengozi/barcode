import express, { request, response } from "express";

import { router } from "./routes";

const port = 3030
const app = express();

app.use(express.json())

app.use(router)

app.listen(port, () => console.log(`Server is runing in port ${port}`));