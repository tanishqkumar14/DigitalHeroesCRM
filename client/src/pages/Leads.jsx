import { useEffect, useState } from "react";

import Layout from "../components/Layout/Layout";
import LeadTable from "../components/Leads/LeadTable";
import SearchFilter from "../components/Leads/SearchFilter";
import AddLeadDialog from "../components/Leads/AddLeadDialog";
import EditLeadDialog from "../components/Leads/EditLeadDialog";
import DeleteLeadDialog from "../components/Leads/DeleteLeadDialog";

import { getLeads } from "../services/lead";

import { toast } from "react-toastify";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // Add Lead Dialog
  const [openModal, setOpenModal] = useState(false);

  // Edit Lead Dialog
  const [editOpen, setEditOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Delete Lead Dialog
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  useEffect(() => {
    loadLeads();
  }, [search, status]);

  const loadLeads = async () => {
    try {
      const res = await getLeads({
        search,
        status,
      });

      setLeads(res.data.leads);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load leads");
    }
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setEditOpen(true);
  };

  const handleDelete = (lead) => {
    setLeadToDelete(lead);
    setDeleteOpen(true);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Lead Management
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
        >
          + Add Lead
        </button>
      </div>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <LeadTable
        leads={leads}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add Lead */}
      <AddLeadDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        refresh={loadLeads}
      />

      {/* Edit Lead */}
      <EditLeadDialog
        open={editOpen}
        lead={selectedLead}
        refresh={loadLeads}
        onClose={() => {
          setEditOpen(false);
          setSelectedLead(null);
        }}
      />

      {/* Delete Lead */}
      <DeleteLeadDialog
        open={deleteOpen}
        lead={leadToDelete}
        refresh={loadLeads}
        onClose={() => {
          setDeleteOpen(false);
          setLeadToDelete(null);
        }}
      />
    </Layout>
  );
};

export default Leads;