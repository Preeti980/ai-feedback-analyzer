"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "@/components/Sidebar";
import DashboardStats from "@/components/DashboardStats";
import SentimentChart from "@/components/SentimentChart";

import { Insights } from "@/types/feedback";

import {
  BarChart3,
  TrendingUp,
  Brain,
  Hash,
} from "lucide-react";

export default function InsightsPage() {
  const [insights, setInsights] =
    useState<Insights | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchInsights =
      async () => {
        try {
          const res =
            await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/insights`
            );

          setInsights(
            res.data.data
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchInsights();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="lg:ml-72 p-5 lg:p-10 pt-24 lg:pt-10">
        {/* Header */}
        <div className="mb-10">
          <p className="text-blue-400 font-medium">
            Analytics Overview
          </p>

          <h1 className="text-5xl font-bold mt-2">
            Insights Dashboard
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Deep AI-generated customer
            feedback analytics
          </p>
        </div>

        {loading ? (
          <div className="text-zinc-400">
            Loading insights...
          </div>
        ) : insights ? (
          <>
            {/* Stats */}
            <DashboardStats
              insights={insights}
            />

            {/* Charts */}
            <div className="mt-8">
              <SentimentChart
                insights={insights}
              />
            </div>

            {/* Insights Grid */}
            <div
              className="
                grid
                lg:grid-cols-2
                2xl:grid-cols-4
                gap-6
                mt-8
              "
            >
              {/* Categories */}
              <div
                className="
                  rounded-3xl
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-6
                "
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="
                      p-3 rounded-2xl
                      bg-blue-500/20
                    "
                  >
                    <BarChart3 className="text-blue-400" />
                  </div>

                  <h2 className="text-2xl font-bold">
                    Top Categories
                  </h2>
                </div>

                <div className="space-y-4">
                  {insights.categoryStats.map(
                    (item) => (
                      <div
                        key={item._id}
                        className="
                          flex items-center
                          justify-between
                          rounded-2xl
                          bg-white/5
                          px-4 py-3
                        "
                      >
                        <span className="capitalize">
                          {item._id.replace(
                            "_",
                            " "
                          )}
                        </span>

                        <span
                          className="
                            rounded-full
                            bg-blue-500/20
                            px-3 py-1
                            text-sm
                            text-blue-400
                          "
                        >
                          {item.count}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Sentiment */}
              <div
                className="
                  rounded-3xl
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-6
                "
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="
                      p-3 rounded-2xl
                      bg-green-500/20
                    "
                  >
                    <TrendingUp className="text-green-400" />
                  </div>

                  <h2 className="text-2xl font-bold">
                    Sentiment Stats
                  </h2>
                </div>

                <div className="space-y-4">
                  {insights.sentimentStats.map(
                    (item) => (
                      <div
                        key={item._id}
                        className="
                          flex items-center
                          justify-between
                          rounded-2xl
                          bg-white/5
                          px-4 py-3
                        "
                      >
                        <span className="capitalize">
                          {item._id}
                        </span>

                        <span
                          className="
                            rounded-full
                            bg-green-500/20
                            px-3 py-1
                            text-sm
                            text-green-400
                          "
                        >
                          {item.count}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Top Topic Tags */}
              <div
                className="
                  rounded-3xl
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-6
                "
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="
                      p-3 rounded-2xl
                      bg-yellow-500/20
                    "
                  >
                    <Hash className="text-yellow-400" />
                  </div>

                  <h2 className="text-2xl font-bold">
                    Topic Tags
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {insights.topicStats.map(
                    (topic) => (
                      <div
                        key={topic._id}
                        className="
                          rounded-2xl
                          border border-white/10
                          bg-white/5
                          px-4 py-3
                        "
                      >
                        <p className="font-medium">
                          #{topic._id}
                        </p>

                        <p className="text-sm text-zinc-400 mt-1">
                          {
                            topic.count
                          }{" "}
                          mentions
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* AI Summary */}
              <div
                className="
                  rounded-3xl
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-6
                "
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="
                      p-3 rounded-2xl
                      bg-purple-500/20
                    "
                  >
                    <Brain className="text-purple-400" />
                  </div>

                  <h2 className="text-2xl font-bold">
                    AI Insights
                  </h2>
                </div>

                <div className="space-y-5">
                  <div
                    className="
                      rounded-2xl
                      bg-white/5
                      p-4
                    "
                  >
                    <p className="text-zinc-400 text-sm">
                      Negative Ratio
                    </p>

                    <h3 className="text-4xl font-bold text-red-400 mt-2">
                      {Math.round(
                        (insights.negativeCount /
                          insights.totalFeedbacks) *
                          100
                      )}
                      %
                    </h3>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      bg-white/5
                      p-4
                    "
                  >
                    <p className="text-zinc-400 text-sm">
                      System Health
                    </p>

                    <h3 className="text-4xl font-bold text-green-400 mt-2">
                      Stable
                    </h3>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      bg-white/5
                      p-4
                    "
                  >
                    <p className="text-zinc-400 text-sm">
                      Critical Issues
                    </p>

                    <h3 className="text-4xl font-bold text-yellow-400 mt-2">
                      {
                        insights.criticalCount
                      }
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}