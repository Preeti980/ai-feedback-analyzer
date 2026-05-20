"use client";

import { useEffect, useMemo, useState } from "react";

import axios from "axios";

import DashboardStats from "@/components/DashboardStats";
import FeedbackCard from "@/components/FeedbackCard";
import SearchFilters from "@/components/SearchFilters";
import SentimentChart from "@/components/SentimentChart";
import UploadSection from "@/components/UploadSection";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";

import { Feedback, Insights } from "@/types/feedback";

import { toast } from "sonner";

export default function HomePage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const [insights, setInsights] = useState<Insights | null>(null);

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");

  const fetchData = async () => {
    try {
      const [feedbackRes, insightsRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback`),

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback/insights`),
      ]);

      setFeedbacks(feedbackRes.data.data);

      setInsights(insightsRes.data.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };

    loadData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      setUploading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/bulk-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      await fetchData();

      toast.success("File uploaded successfully!");
    } catch (error) {
      console.log(error);

      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const filteredFeedbacks = useMemo(() => {
    const filtered = feedbacks.filter((item) => {
      const matchesSearch =
        item.message.toLowerCase().includes(search.toLowerCase()) ||
        item.summary.toLowerCase().includes(search.toLowerCase());

      const matchesSentiment =
        selectedSentiment === "all"
          ? true
          : item.sentiment === selectedSentiment;

      return matchesSearch && matchesSentiment;
    });

    const urgencyOrder = {
      critical: 4,
      high: 3,
      medium: 2,
      low: 1,
    };

    filtered.sort((a, b) => {
      if (selectedSort === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      if (selectedSort === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }

      if (selectedSort === "highUrgency") {
        return (
          urgencyOrder[b.urgency as keyof typeof urgencyOrder] -
          urgencyOrder[a.urgency as keyof typeof urgencyOrder]
        );
      }

      if (selectedSort === "lowUrgency") {
        return (
          urgencyOrder[a.urgency as keyof typeof urgencyOrder] -
          urgencyOrder[b.urgency as keyof typeof urgencyOrder]
        );
      }

      return 0;
    });

    return filtered;
  }, [feedbacks, search, selectedSentiment, selectedSort]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="lg:ml-72 pt-24 lg:pt-10 p-5 lg:p-10">
        {/* DASHBOARD */}
        <div id="dashboard">
          <Topbar search={search} setSearch={setSearch} />
        </div>

        {/* STATS + ANALYTICS */}
        {insights && (
          <div id="analytics">
            <DashboardStats insights={insights} />

            <SentimentChart insights={insights} />
          </div>
        )}

        {/* UPLOAD */}
        <div id="uploads">
          <UploadSection
            uploading={uploading}
            handleFileUpload={handleFileUpload}
          />
        </div>

        {/* FILTERS */}
        <div className="mb-6">
          <SearchFilters
            search={search}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            setSearch={setSearch}
            selectedSentiment={selectedSentiment}
            setSelectedSentiment={setSelectedSentiment}
          />
        </div>

        {/* FEEDBACKS */}
        <div id="feedbacks">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold">Feedbacks</h2>

              <p className="text-zinc-400 mt-1">
                AI analyzed customer feedback list
              </p>
            </div>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : filteredFeedbacks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-5">
              {filteredFeedbacks.map((item) => (
                <FeedbackCard
                  key={item._id}
                  item={item}
                  refreshData={fetchData}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
