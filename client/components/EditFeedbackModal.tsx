"use client";

import { useState } from "react";

import axios from "axios";

import { X } from "lucide-react";

import { Feedback } from "@/types/feedback";
import { toast } from "sonner";

interface Props {
  item: Feedback;

  open: boolean;

  onClose: () => void;

  refreshData: () => void;
}

export default function EditFeedbackModal({
  item,
  open,
  onClose,
  refreshData,
}: Props) {
  const [sentiment, setSentiment] =
    useState(item.sentiment);

  const [category, setCategory] =
    useState(item.category);

  const [urgency, setUrgency] =
    useState(item.urgency);

  const [summary, setSummary] =
    useState(item.summary);

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${item._id}`,
        {
          sentiment,
          category,
          urgency,
          summary,
        }
      );

      await refreshData();

     toast.success("Feedback updated!");

      onClose();
    } catch (error) {
      console.log(error);

     
     toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Edit Feedback
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm text-zinc-400">
              Sentiment
            </label>

            <select
              value={sentiment}
              onChange={(e) =>
                setSentiment(e.target.value)
              }
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
            >
              <option value="positive">
                Positive
              </option>

              <option value="negative">
                Negative
              </option>

              <option value="neutral">
                Neutral
              </option>

              <option value="mixed">
                Mixed
              </option>
            </select>
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Category
            </label>

            <input
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Urgency
            </label>

            <select
              value={urgency}
              onChange={(e) =>
                setUrgency(e.target.value)
              }
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
            >
              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>

              <option value="critical">
                Critical
              </option>
            </select>
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Summary
            </label>

            <textarea
              value={summary}
              onChange={(e) =>
                setSummary(e.target.value)
              }
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 h-28"
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-zinc-200 transition"
          >
            {loading
              ? "Updating..."
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}