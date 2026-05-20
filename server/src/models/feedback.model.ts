import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    email: {
      type: String,
      default: "",
    },

   source: {
  type: String,
  enum: [
    "support",
    "app_store",
    "play_store",
    "survey",
    "chat",
    "website",
  ],
  default: "support",
},

    sentiment: {
      type: String,
      enum: ["positive", "negative", "neutral", "mixed"],
      default: "neutral",
    },

    category: {
      type: String,
      enum: [
        "bug",
        "feature_request",
        "pricing",
        "usability",
        "support",
        "praise",
        "other",
      ],
      default: "other",
    },

    urgency: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low",
    },

    summary: {
      type: String,
      default: "",
    },

    key_topics: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;