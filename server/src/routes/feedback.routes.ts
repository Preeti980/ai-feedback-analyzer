import express from "express";
import { bulkUploadFeedbacks, createFeedback, deleteFeedback, getAllFeedbacks, getInsights, updateFeedback } from "../controllers/feedback.controller.js";
import multer from "multer";


const router = express.Router();
const upload = multer({
  dest: "uploads/",
});
router.get("/insights", getInsights);
router.get("/", getAllFeedbacks);

router.post("/", createFeedback);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);
router.post(
  "/bulk-upload",
  upload.single("file"),
  bulkUploadFeedbacks
);
export default router;