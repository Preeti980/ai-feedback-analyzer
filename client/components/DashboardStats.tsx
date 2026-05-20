import {
  MessageSquare,
  AlertTriangle,
  Siren,
} from "lucide-react";

import { Insights } from "@/types/feedback";

interface Props {
  insights: Insights;
}

export default function DashboardStats({
  insights,
}: Props) {
  const stats = [
    {
      title: "Total Feedbacks",
      value: insights.totalFeedbacks,
      icon: MessageSquare,
      gradient:
        "from-blue-500 to-cyan-500",
    },

    {
      title: "Negative Feedbacks",
      value: insights.negativeCount,
      icon: AlertTriangle,
      gradient:
        "from-red-500 to-orange-500",
    },

    {
      title: "Critical Issues",
      value: insights.criticalCount,
      icon: Siren,
      gradient:
        "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">
                  {item.title}
                </p>

                <h2 className="text-5xl font-bold mt-4">
                  {item.value}
                </h2>
              </div>

              <div
                className={`bg-gradient-to-br ${item.gradient} p-4 rounded-2xl`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}