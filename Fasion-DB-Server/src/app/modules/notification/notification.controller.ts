import { Request, Response } from "express";
import { sendMessageToToken } from "../../utils/fcmService";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user: JwtPayload; 
}

const tokens = new Map<string, string>(); // userId -> token

/**
 * Register an FCM token for the authenticated user
 */
export const registerToken = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.userId || req.user.id;
    const { token } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!token) {
      return res.status(400).json({ error: "FCM token required" });
    }

    tokens.set(userId, token);
    res.json({ message: "Token registered successfully", userId });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Send a notification to a specific user's registered device
 */
export const sendNotification = async (req: Request, res: Response) => {
  const { userId, title, body, data } = req.body;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  const token = tokens.get(userId);
  if (!token) return res.status(404).json({ error: "User FCM token not found" });

  try {
    const response = await sendMessageToToken(token, { title, body, data });
    res.json({ success: true, response });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Send a broadcast notification to all registered users
 */
export const broadcastNotification = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  const results: any[] = [];

  for (const [userId, token] of tokens.entries()) {
    try {
      const resp = await sendMessageToToken(token, { title, body });
      results.push({ userId, success: true, resp });
    } catch (err: any) {
      results.push({ userId, success: false, error: err.message });
    }
  }

  res.json({ total: tokens.size, results });
};
