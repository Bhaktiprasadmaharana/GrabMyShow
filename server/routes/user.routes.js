import express from "express";
import { clerkWebhook } from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  clerkWebhook
);

export default router;
