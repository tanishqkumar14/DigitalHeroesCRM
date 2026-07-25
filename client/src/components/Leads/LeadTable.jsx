import { Pencil, Trash2, Mail, Building2 } from "lucide-react";

const statusColor = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Qualified: "bg-purple-100 text-purple-700",
  Won: "bg-green-100 text-green-700",
  Lost: "bg-red-100 text-red-700",
};

const LeadTable = ({ leads = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Lead Management
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage all customer leads
          </p>
        </div>

        <span className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          {leads.length} Leads
        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr className="text-left text-sm uppercase tracking-wide text-gray-500">

              <th className="px-6 py-4 font-semibold">
                Lead
              </th>

              <th className="px-6 py-4 font-semibold">
                Company
              </th>

              <th className="px-6 py-4 font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {leads.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="py-14 text-center text-gray-500"
                >
                  No Leads Found
                </td>

              </tr>

            ) : (

              leads.map((lead) => (

                <tr
                  key={lead._id}
                  className="border-t border-gray-100 transition hover:bg-blue-50/40"
                >

                  {/* Lead */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white shadow">

                        {lead.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}

                      </div>

                      <div>

                        <p className="font-semibold text-gray-800">
                          {lead.name}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">

                          <Mail size={14} />

                          {lead.email}

                        </div>

                      </div>

                    </div>

                  </td>

                  {/* Company */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2 text-gray-700">

                      <Building2 size={16} />

                      {lead.company || "-"}

                    </div>

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        statusColor[lead.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {lead.status}
                    </span>

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => onEdit(lead)}
                        className="flex items-center gap-2 rounded-xl bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-600 hover:text-white"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(lead)}
                        className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-2 text-red-700 transition hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default LeadTable;