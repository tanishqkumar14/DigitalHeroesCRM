import { TrendingUp } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon,
  color = "bg-blue-500",
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-100 opacity-30 blur-3xl transition-all duration-300 group-hover:scale-125" />

      <div className="relative flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            {value}
          </h2>

          <div className="mt-5 flex items-center gap-2">

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
              <TrendingUp
                size={14}
                className="text-green-600"
              />
            </div>

            <span className="text-sm font-medium text-green-600">
              Updated Live
            </span>

          </div>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg ${color} transition-all duration-300 group-hover:rotate-6 group-hover:scale-110`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default StatCard;