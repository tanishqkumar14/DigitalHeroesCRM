import { useState } from "react";
import { toast } from "react-toastify";

import LeadForm from "./LeadForm";
import { createLead } from "../../services/lead";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const AddLeadDialog = ({ open, onClose, refresh }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await createLead(data);

      toast.success("Lead created successfully!");

      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Failed to create lead"
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
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>

        <LeadForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadDialog;