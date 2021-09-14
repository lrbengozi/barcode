import { Router } from "express";
import status from "./controllers/status";
import boleto from "./controllers/boleto"
import boletoMiddleware from "./middleware/boleto"

const router = Router();

router.get("/status", status.handle);
router.get("/boleto/:linhadigitavel", boletoMiddleware.validate, boleto.handle);

export { router };