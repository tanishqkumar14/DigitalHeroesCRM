import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

const LeadSourceChart = ({ data }) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Lead Sources
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Distribution of incoming leads
        </p>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={75}
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
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "none",
              boxShadow: "0 10px 25px rgba(0,0,0,.12)",
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
          />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default LeadSourceChart;