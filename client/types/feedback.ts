export interface Feedback {
  _id: string;

  message: string;

  email: string;

  source: string;

  sentiment: string;

  category: string;

  urgency: string;

  summary: string;

  key_topics: string[];

  createdAt: string;

  updatedAt: string;
}

export interface Insights {
  totalFeedbacks: number;

  negativeCount: number;

  criticalCount: number;

  categoryStats: {
    _id: string;
    count: number;
  }[];

  sentimentStats: {
    _id: string;
    count: number;
  }[];

  topicStats: {
    _id: string;
    count: number;
  }[];
}