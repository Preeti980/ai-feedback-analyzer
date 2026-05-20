"use client";

interface Props {
  search: string;

  setSearch: (
    value: string
  ) => void;

  selectedSentiment: string;

  setSelectedSentiment: (
    value: string
  ) => void;

  selectedSort: string;

  setSelectedSort: (
    value: string
  ) => void;
}

export default function SearchFilters({
  search,
  setSearch,
  selectedSentiment,
  setSelectedSentiment,
  selectedSort,
  setSelectedSort,
}: Props) {
  return (
    <div
      className="
        flex flex-col xl:flex-row
        gap-4
        mb-6
      "
    >
      {/* Search */}
      <input
        type="text"
        placeholder="Search feedback..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          flex-1
          rounded-2xl
          border border-white/10
          bg-white/5
          px-5 py-4
          outline-none
        "
      />

      {/* Sentiment Filter */}
      <select
        value={selectedSentiment}
        onChange={(e) =>
          setSelectedSentiment(
            e.target.value
          )
        }
        className="
          rounded-2xl
          border border-white/10
          bg-[#111]
          px-5 py-4
          outline-none
        "
      >
        <option value="all">
          All Sentiments
        </option>

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

      {/* Sorting */}
      <select
        value={selectedSort}
        onChange={(e) =>
          setSelectedSort(
            e.target.value
          )
        }
        className="
          rounded-2xl
          border border-white/10
          bg-[#111]
          px-5 py-4
          outline-none
        "
      >
        <option value="newest">
          Newest First
        </option>

        <option value="oldest">
          Oldest First
        </option>

        <option value="highUrgency">
          High Urgency
        </option>

        <option value="lowUrgency">
          Low Urgency
        </option>
      </select>
    </div>
  );
}