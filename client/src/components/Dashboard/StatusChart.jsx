import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = {
  New: "#3B82F6",
  Contacted: "#06B6D4",
  Qualified: "#8B5CF6",
  Won: "#22C55E",
  Lost: "#EF4444",
};

const DEFAULT_COLORS = [
  "#3B82F6",
  "#06B6D4",
  "#8B5CF6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];

const StatusChart = ({ data }) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Lead Status
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Current pipeline distribution
        </p>
      </div>

      <ResponsiveContainer width="100%" height={330}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={4}
            cornerRadius={8}
            label={({ percent }) =>
              `${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[entry.name] ||
                  DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                }
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,.12)",
            }}
          />

          <Legend verticalAlign="bottom" />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default StatusChart;