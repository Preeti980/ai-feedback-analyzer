"use client";

import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <div className="grid gap-5">
      {Array.from({ length: 4 }).map(
        (_, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0.5,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              repeatType: "reverse",
            }}
            className="
              rounded-3xl
              border border-white/10
              bg-gradient-to-br
              from-[#15151d]
              to-[#0d0d12]
              p-7
            "
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-4 w-24 rounded bg-zinc-800 mb-4" />

                <div className="h-8 w-[80%] rounded bg-zinc-800" />
              </div>

              <div className="h-12 w-12 rounded-2xl bg-zinc-800" />
            </div>

            {/* Badges */}
            <div className="flex gap-3 mt-6">
              <div className="h-8 w-24 rounded-full bg-zinc-800" />

              <div className="h-8 w-24 rounded-full bg-zinc-800" />

              <div className="h-8 w-24 rounded-full bg-zinc-800" />
            </div>

            {/* Summary */}
            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded bg-zinc-800" />

              <div className="h-4 w-[90%] rounded bg-zinc-800" />

              <div className="h-4 w-[70%] rounded bg-zinc-800" />
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-between">
              <div className="h-4 w-40 rounded bg-zinc-800" />

              <div className="h-4 w-24 rounded bg-zinc-800" />
            </div>
          </motion.div>
        )
      )}
    </div>
  );
}