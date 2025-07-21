import { useEffect, useState } from "react";
import PaginationPokemons from "../components/PaginationPokemons";
import LoadMorePokemons from "../components/LoadMorePokemons";

const TABS = {
  PAGINATION: "Pagination",
  LOAD_MORE: "Load More",
} as const;

type Tab = (typeof TABS)[keyof typeof TABS];

export default function Home() {
  const [tab, setTab] = useState<Tab>(TABS.PAGINATION);

  useEffect(() => {
    document.body.style.backgroundColor =
      tab === TABS.PAGINATION ? "#E1EACD" : "#E8F9FF";
  }, [tab]);

  return (
    <div className="py-4 h-screen">
      <h3 className="text-3xl font-bold text-center my-4">Pokedex</h3>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setTab(TABS.PAGINATION)}
          className={`px-4 py-2 rounded mr-2 transition-colors ${
            tab === TABS.PAGINATION
              ? "bg-black text-white font-bold"
              : "bg-white text-black"
          }`}
        >
          {TABS.PAGINATION}
        </button>
        <button
          onClick={() => setTab(TABS.LOAD_MORE)}
          className={`px-4 py-2 rounded transition-colors ${
            tab === TABS.LOAD_MORE
              ? "bg-black text-white font-bold"
              : "bg-white text-black"
          }`}
        >
          {TABS.LOAD_MORE}
        </button>
      </div>
      {tab === TABS.PAGINATION && <PaginationPokemons />}
      {tab === TABS.LOAD_MORE && <LoadMorePokemons />}
    </div>
  );
}
