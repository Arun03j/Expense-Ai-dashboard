interface DateFilterProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

export default function DateFilter({
  selectedFilter,
  setSelectedFilter,
}: DateFilterProps) {

  const filters = [
    "All",
    "Today",
    "Week",
    "Month",
  ];

  return (
    <div className="flex gap-3 mb-6">

      {filters.map((filter) => (

        <button
          key={filter}
          onClick={() => setSelectedFilter(filter)}
          className={`px-5 py-2 rounded-xl transition-all font-medium
          
          ${
            selectedFilter === filter
              ? "bg-emerald-500 text-white"
              : "bg-zinc-900 text-zinc-400 border border-zinc-800"
          }
          
          `}
        >
          {filter}
        </button>

      ))}

    </div>
  );
}