import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const RevenueChart = ({ data }) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Monthly Leads
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Lead generation performance
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-4 py-2">

          <p className="text-xs text-blue-500">
            Total
          </p>

          <h3 className="text-xl font-bold text-blue-700">
            {data.reduce((sum, item) => sum + item.leads, 0)}
          </h3>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={330}
      >
        <AreaChart
          data={data}
        >

          <defs>

            <linearGradient
              id="leadGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#2563EB"
                stopOpacity={0.55}
              />

              <stop
                offset="100%"
                stopColor="#2563EB"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#ECECEC"
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{
              stroke: "#2563EB",
            }}
            contentStyle={{
              borderRadius: 16,
              border: "none",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.12)",
            }}
          />

          <Area
            type="monotone"
            dataKey="leads"
            stroke="#2563EB"
            strokeWidth={4}
            fill="url(#leadGradient)"
            activeDot={{
              r: 7,
            }}
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;