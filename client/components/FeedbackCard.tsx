"use client";

import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  Trash2,
  Pencil,
  Clock3,
  Mail,
  MessageSquare,
} from "lucide-react";

import { Feedback } from "@/types/feedback";

import EditFeedbackModal from "./EditFeedbackModal";
import { toast } from "sonner";

interface Props {
  item: Feedback;

  refreshData: () => void;
}

export default function FeedbackCard({
  item,
  refreshData,
}: Props) {
  const [openEdit, setOpenEdit] =
    useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${item._id}`
      );

      await refreshData();

     toast.success("Feedback deleted!");
    } catch (error) {
      console.log(error);

     toast.error("Delete failed");
    }
  };

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        whileHover={{
          y: -4,
        }}
        className="
          relative
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-gradient-to-br
          from-[#15151d]
          to-[#0d0d12]
          p-7
          transition-all
          duration-300
          hover:border-white/20
          hover:shadow-2xl
          hover:shadow-blue-500/10
        "
      >
        {/* Glow Effect */}
        <div
          className="
            absolute
            -top-20
            right-0
            h-40
            w-40
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between gap-5">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-zinc-500 text-sm mb-3">
              <MessageSquare size={16} />

              <span className="uppercase tracking-wide">
                {item.source}
              </span>
            </div>

            <h2 className="text-2xl font-semibold leading-snug text-white">
              {item.message}
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                setOpenEdit(true)
              }
              className="
                flex h-11 w-11 items-center justify-center
                rounded-2xl
                bg-blue-500/10
                text-blue-400
                transition-all
                hover:bg-blue-500
                hover:text-white
              "
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={handleDelete}
              className="
                flex h-11 w-11 items-center justify-center
                rounded-2xl
                bg-red-500/10
                text-red-400
                transition-all
                hover:bg-red-500
                hover:text-white
              "
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="relative z-10 flex gap-3 mt-6 flex-wrap">
          <span
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium capitalize
              ${
                item.sentiment ===
                "positive"
                  ? "bg-green-500/15 text-green-400"
                  : item.sentiment ===
                    "negative"
                  ? "bg-red-500/15 text-red-400"
                  : "bg-zinc-700 text-zinc-300"
              }
            `}
          >
            {item.sentiment}
          </span>

          <span
            className="
              bg-blue-500/15
              text-blue-400
              px-4 py-1.5
              rounded-full
              text-sm
              font-medium
              capitalize
            "
          >
            {item.category}
          </span>

          <span
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium capitalize
              ${
                item.urgency === "high"
                  ? "bg-orange-500/15 text-orange-400"
                  : item.urgency ===
                    "critical"
                  ? "bg-red-500/20 text-red-500"
                  : "bg-yellow-500/15 text-yellow-400"
              }
            `}
          >
            {item.urgency}
          </span>
        </div>

        {/* Summary */}
        <p className="relative z-10 mt-6 text-zinc-300 text-lg leading-8">
          {item.summary}
        </p>

        {/* Topics */}
        <div className="relative z-10 flex gap-2 mt-6 flex-wrap">
          {item.key_topics?.map(
            (topic, index) => (
              <span
                key={index}
                className="
                  border border-white/10
                  bg-white/5
                  backdrop-blur-sm
                  px-3 py-2
                  rounded-xl
                  text-sm
                  text-zinc-300
                "
              >
                #{topic}
              </span>
            )
          )}
        </div>

        {/* Footer */}
        <div
          className="
            relative z-10
            mt-8
            pt-5
            border-t border-white/10
            flex items-center justify-between flex-wrap gap-4
          "
        >
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Mail size={15} />

            <span>{item.email}</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <Clock3 size={15} />

            <span>
              {new Date(
                item.createdAt
              ).toLocaleDateString()}
            </span>
          </div>
        </div>
      </motion.div>

      <EditFeedbackModal
        item={item}
        open={openEdit}
        onClose={() =>
          setOpenEdit(false)
        }
        refreshData={refreshData}
      />
    </>
  );
}