"use client";

import { Bell, Search } from "lucide-react";

interface Props {
  search: string;

  setSearch: (
    value: string
  ) => void;
}

export default function Topbar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
      <div>
        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <p className="text-zinc-400 mt-2">
          Monitor AI analyzed customer
          feedback
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-800 rounded-2xl pl-11 pr-4 py-3 w-[280px] outline-none"
          />
        </div>

        <button className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl hover:bg-zinc-800 transition">
          <Bell size={20} />
        </button>
      </div>
    </div>
  );
}