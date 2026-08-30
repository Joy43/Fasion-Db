import { Router } from "express";
import { broadcastNotification, registerToken, sendNotification } from "./notification.controller";
const router = Router();
router.post("/register", registerToken);
router.post("/send", sendNotification);
router.post("/broadcast", broadcastNotification);

export const Notificationrouter=router;
