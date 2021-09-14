import { Router } from "express";
import getStatus from "./controllers/getStatus";

const router = Router();

router.get("/status", getStatus.handle);

export { router };