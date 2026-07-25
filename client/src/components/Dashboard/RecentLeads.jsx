const statusStyles = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-cyan-100 text-cyan-700",
  Qualified: "bg-purple-100 text-purple-700",
  Won: "bg-green-100 text-green-700",
  Lost: "bg-red-100 text-red-700",
};

const RecentLeads = ({ leads = [] }) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Leads
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest customers added to your CRM
          </p>
        </div>

        <span className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          {leads.length} Leads
        </span>
      </div>

      {leads.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No recent leads found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="border-b border-gray-200 text-left text-sm uppercase tracking-wide text-gray-500">
                <th className="pb-4 font-semibold">Lead</th>
                <th className="pb-4 font-semibold">Email</th>
                <th className="pb-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b border-gray-100 transition hover:bg-gray-50"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white">
                        {lead.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {lead.name}
                        </p>

                        {lead.company && (
                          <p className="text-sm text-gray-500">
                            {lead.company}
                          </p>
                        )}
                      </div>

                    </div>
                  </td>

                  <td className="text-gray-600">
                    {lead.email}
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        statusStyles[lead.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default RecentLeads;