import { Request, Response } from "express";

export async function healthcheck(req: Request, res: Response) {
  return res.status(200).json({ message: "OK" });
}
