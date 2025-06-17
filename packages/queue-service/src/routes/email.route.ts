import { Router } from "express";
import {
    enqueueForgotPasswordJob,
    enqueueNewUserOtpJob,
    enqueueWelcomeEmailJob,
} from "../controllers/mail.controller";

const router = Router();

router.post("/newuser-mail", enqueueNewUserOtpJob);
router.post("/forgot-password-mail", enqueueForgotPasswordJob);
router.post("/welcome-mail", enqueueWelcomeEmailJob);

export default router;
