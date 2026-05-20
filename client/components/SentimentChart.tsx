"use client";

import { motion } from "framer-motion";

import { Insights } from "@/types/feedback";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  insights: Insights;
}

export default function SentimentChart({
  insights,
}: Props) {
  const pieData = [
    {
      name: "Negative",
      value: insights.negativeCount,
    },

    {
      name: "Others",
      value:
        insights.totalFeedbacks -
        insights.negativeCount,
    },
  ];

  const categoryData =
    insights.categoryStats || [];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
      {/* PIE CHART */}
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
          duration: 0.4,
        }}
        className="
          relative
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-gradient-to-br
          from-[#14141b]
          to-[#0c0c11]
          p-7
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
            bg-blue-500/10
            blur-3xl
          "
        />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">
            Sentiment Analysis
          </h2>

          <p className="text-zinc-400">
            Distribution of analyzed
            customer sentiments
          </p>

          <div className="h-[320px] mt-6">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  label
                >
                  <Cell fill="#ef4444" />

                  <Cell fill="#3b82f6" />
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* BAR CHART */}
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
          p-7
        "
      >
        {/* Glow */}
        <div
          className="
            absolute
            bottom-0
            left-0
            h-40
            w-40
            rounded-full
            bg-purple-500/10
            blur-3xl
          "
        />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">
            Category Analytics
          </h2>

          <p className="text-zinc-400">
            Feedback grouped by AI
            detected categories
          </p>

          <div className="h-[320px] mt-6">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={categoryData}
              >
                <XAxis dataKey="_id" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="count"
                  radius={[10, 10, 0, 0]}
                  fill="#8b5cf6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}