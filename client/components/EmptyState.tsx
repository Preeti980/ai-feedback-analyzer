"use client";

import { SearchX } from "lucide-react";

import { motion } from "framer-motion";

export default function EmptyState() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-3xl
        border border-white/10
        bg-gradient-to-br
        from-[#14141b]
        to-[#0c0c11]
        p-14
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex h-24 w-24
          items-center justify-center
          rounded-full
          bg-blue-500/10
        "
      >
        <SearchX
          size={42}
          className="text-blue-400"
        />
      </div>

      <h2 className="mt-8 text-3xl font-bold">
        No Feedback Found
      </h2>

      <p className="mt-3 text-zinc-400 max-w-lg mx-auto leading-7">
        No feedback matches your current
        search or filter settings. Try
        adjusting filters or uploading new
        feedback data.
      </p>
    </motion.div>
  );
}