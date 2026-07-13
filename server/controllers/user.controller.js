import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.WEBHOOK_SECRET);

    const payload = req.body.toString();

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
      return res.status(400).json({
        success: false,
        message: "Missing Svix headers",
      });
    }

    console.log("===== Clerk Webhook Debug =====");
    console.log("Headers:", headers);
    console.log("Webhook Secret Present:", !!process.env.WEBHOOK_SECRET);
    console.log("Payload Type:", typeof payload);
    const event = whook.verify(payload, headers);

    const { data, type } = event;
    console.log(`📨 Clerk Event: ${type}`);

    switch (type) {
      case "user.created":
        await User.create({
          clerkId: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email_addresses[0].email_address,
          imageUrl: data.image_url,
        });
        console.log("✅ User saved to MongoDB");
        break;

      case "user.updated":
        await User.findOneAndUpdate(
          { clerkId: data.id },
          {
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email_addresses[0].email_address,
            imageUrl: data.image_url,
          }
        );
        console.log("✏️ User updated");
        break;

      case "user.deleted":
        await User.findOneAndDelete({
          clerkId: data.id,
        });
        console.log("🗑️ User deleted");
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (error) {
    console.error("❌ Clerk Webhook Verification Failed");
    console.error(error);
    console.error(error?.stack);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};