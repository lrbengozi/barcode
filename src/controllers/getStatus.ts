
import { Request, Response } from "express";

class GetStatus {
    async handle(request: Request, response: Response) {
    return response.json({ ok: "ok" });
  }
}

export = GetStatus;