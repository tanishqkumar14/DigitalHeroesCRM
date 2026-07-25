import { useState } from "react";
import { toast } from "react-toastify";

import LeadForm from "./LeadForm";
import { updateLead } from "../../services/lead";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const EditLeadDialog = ({
  open,
  onClose,
  lead,
  refresh,
}) => {
  const [loading, setLoading] = useState(false);

  console.log("Selected Lead:", lead);

  if (!lead) return null;

  // ...

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await updateLead(lead._id, data);

      toast.success("Lead updated successfully!");

      refresh();
      onClose();
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
          "Failed to update lead"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
        </DialogHeader>

 <LeadForm
  defaultValues={{
    name: lead?.name || "",
    email: lead?.email || "",
    phone: lead?.phone || "",
    company: lead?.company || "",
    source: lead?.source || "",
    status: lead?.status || "New",
    priority: lead?.priority || "Medium",
    value: lead?.value ?? 0,
    notes: lead?.notes || "",
  }}
  onSubmit={handleSubmit}
  loading={loading}
/>
      </DialogContent>
    </Dialog>
  );
};

export default EditLeadDialog;