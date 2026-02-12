import express from "express";
import { createEnquiry, deleteEnquiry, getEnquiries, toggleStatus } from "../controllers/enquiryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createEnquiry);
router.get("/", protect, getEnquiries);
router.delete("/:id", protect, deleteEnquiry);
router.put("/:id/status", protect, toggleStatus);

export default router;
