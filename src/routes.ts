import { Router } from "express";
import GetStatus from "./controllers/getStatus";

const router = Router();

const getStatus = new GetStatus;

router.get("/status", getStatus.handle);

export { router };