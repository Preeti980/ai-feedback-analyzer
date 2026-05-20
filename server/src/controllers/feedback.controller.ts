import type { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";

import Feedback from "../models/feedback.model.js";
import { analyzeFeedback } from "../services/gemini.service.js";
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
export const createFeedback = async (
  req: Request,
  res: Response
) => {
  try {
    const { message, email, source } = req.body;

    // validation
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Feedback message is required",
      });
    }

    // AI analysis
    const aiResult = await analyzeFeedback(message);

    // save in DB
    const feedback = await Feedback.create({
      message,
      email,
      source,

      sentiment: aiResult.sentiment,
      category: aiResult.category,
      urgency: aiResult.urgency,
      summary: aiResult.summary,
      key_topics: aiResult.key_topics,
    });

    return res.status(201).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.log("Create Feedback Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllFeedbacks = async (
  req: Request,
  res: Response
) => {
  try {
    const { sentiment, category, urgency, sort } =
      req.query;

    const filter: any = {};

    if (sentiment) {
      filter.sentiment = sentiment;
    }

    if (category) {
      filter.category = category;
    }

    if (urgency) {
      filter.urgency = urgency;
    }

    let sortOption: any = {
      createdAt: -1,
    };

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    if (sort === "urgency") {
      sortOption = { urgency: -1 };
    }

    const feedbacks = await Feedback.find(filter).sort(
      sortOption
    );

    return res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.log("Get Feedback Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getInsights = async (
  req: Request,
  res: Response
) => {
  try {
    const totalFeedbacks =
      await Feedback.countDocuments();

    const negativeCount =
      await Feedback.countDocuments({
        sentiment: "negative",
      });

    const criticalCount =
      await Feedback.countDocuments({
        urgency: "critical",
      });

    // Category stats
    const categoryStats =
      await Feedback.aggregate([
        {
          $group: {
            _id: "$category",
            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },
      ]);

    // Sentiment stats
    const sentimentStats =
      await Feedback.aggregate([
        {
          $group: {
            _id: "$sentiment",
            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },
      ]);

    // Top topic tags
    const topicStats =
      await Feedback.aggregate([
        {
          $unwind: "$key_topics",
        },

        {
          $group: {
            _id: "$key_topics",
            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },

        {
          $limit: 5,
        },
      ]);

    return res.status(200).json({
      success: true,

      data: {
        totalFeedbacks,
        negativeCount,
        criticalCount,
        categoryStats,
        sentimentStats,
        topicStats,
      },
    });
  } catch (error) {
    console.log(
      "Insights Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateFeedback = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const updatedFeedback =
      await Feedback.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );

    if (!updatedFeedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedFeedback,
    });
  } catch (error) {
    console.log("Update Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const deleteFeedback = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const deletedFeedback =
      await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.log("Delete Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const bulkUploadFeedbacks = async (
  req: Request,
  res: Response
) => {
  try {
    if (!(req as any).file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const filePath = (req as any).file.path;

    const feedbacks: any[] = [];

    if ((req as any).file.mimetype.includes("json")) {
      const rawData = fs.readFileSync(
        filePath,
        "utf-8"
      );

      const parsedData = JSON.parse(rawData);

      feedbacks.push(...parsedData);
    } else {
      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on("data", (data) => {
            feedbacks.push(data);
          })
          .on("end", resolve)
          .on("error", reject);
      });
    }

    const savedFeedbacks = [];

    for (const item of feedbacks) {
      const aiAnalysis = await analyzeFeedback(
        item.message
      );

      const savedFeedback = await Feedback.create({
        ...item,
        ...aiAnalysis,
      });

      savedFeedbacks.push(savedFeedback);

      // Rate limit delay
      await delay(2000);
    }

    fs.unlinkSync(filePath);

    return res.status(201).json({
      success: true,
      count: savedFeedbacks.length,
      data: savedFeedbacks,
    });
  } catch (error) {
    console.log("Bulk Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};