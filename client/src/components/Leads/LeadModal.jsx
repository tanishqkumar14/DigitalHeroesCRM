import { useState } from "react";
import { toast } from "react-toastify";

import { createLead } from "../../services/lead";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "Website",
  status: "New",
  priority: "Medium",
  value: 0,
  notes: "",
};

const LeadModal = ({ open, onClose, onSuccess }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "value"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createLead(form);

      toast.success("Lead created successfully!");

      setForm(initialForm);

      onSuccess();
      onClose();

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create lead"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">

          <Input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <Input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
          />

          <Input
            name="source"
            placeholder="Source"
            value={form.source}
            onChange={handleChange}
          />

          <Input
            name="status"
            placeholder="Status"
            value={form.status}
            onChange={handleChange}
          />

          <Input
            name="priority"
            placeholder="Priority"
            value={form.priority}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="value"
            placeholder="Deal Value"
            value={form.value}
            onChange={handleChange}
          />

          <div className="col-span-2">
            <Input
              name="notes"
              placeholder="Notes"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Lead"}
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeadModal;