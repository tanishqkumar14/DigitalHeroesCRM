const SearchFilter = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  return (
    <div className="flex gap-4 mb-6">

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search..."
        className="border rounded-lg p-3 flex-1"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="border rounded-lg p-3"
      >
        <option value="">All Status</option>
        <option>New</option>
        <option>Contacted</option>
        <option>Qualified</option>
        <option>Won</option>
        <option>Lost</option>
      </select>

    </div>
  );
};

export default SearchFilter;