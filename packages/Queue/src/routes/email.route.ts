import { Router } from "express";
import { enqueueMailJob } from "../controllers/mail.controller";

const router = Router();

router.post("/mail", enqueueMailJob);

export default router;
