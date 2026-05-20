"use client";

import { motion } from "framer-motion";

import {
  UploadCloud,
  FileJson,
  FileSpreadsheet,
} from "lucide-react";

interface Props {
  uploading: boolean;

  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function UploadSection({
  uploading,
  handleFileUpload,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-gradient-to-br
        from-[#14141b]
        to-[#0c0c11]
        p-8
        mb-10
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          top-0
          right-0
          h-40
          w-40
          rounded-full
          bg-purple-500/10
          blur-3xl
        "
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="
                flex h-14 w-14 items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                to-purple-600
              "
            >
              <UploadCloud size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Bulk Upload Feedbacks
              </h2>

              <p className="text-zinc-400 mt-1">
                Upload customer feedback files
                for AI-powered analysis
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <div
              className="
                flex items-center gap-2
                rounded-2xl
                border border-white/10
                bg-white/5
                px-4 py-3
                text-sm text-zinc-300
              "
            >
              <FileJson size={18} />

              JSON Supported
            </div>

            <div
              className="
                flex items-center gap-2
                rounded-2xl
                border border-white/10
                bg-white/5
                px-4 py-3
                text-sm text-zinc-300
              "
            >
              <FileSpreadsheet size={18} />

              CSV Supported
            </div>
          </div>
        </div>

        {/* Right */}
        <label
          className="
            group
            cursor-pointer
          "
        >
          <div
            className="
              flex flex-col items-center justify-center
              rounded-3xl
              border border-dashed border-white/20
              bg-white/5
              px-10 py-10
              transition-all
              duration-300
              hover:border-blue-500/50
              hover:bg-blue-500/5
            "
          >
            <UploadCloud
              size={42}
              className="
                text-blue-400
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            <p className="mt-4 text-lg font-semibold">
              {uploading
                ? "Uploading..."
                : "Click to Upload"}
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Drag & drop JSON or CSV files
            </p>
          </div>

          <input
            type="file"
            accept=".json,.csv"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </motion.div>
  );
}