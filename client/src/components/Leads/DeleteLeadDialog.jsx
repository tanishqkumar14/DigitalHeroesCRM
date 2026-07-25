import { useState } from "react";
import { toast } from "react-toastify";

import { deleteLead } from "../../services/lead";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

import { Button } from "../ui/button";

const DeleteLeadDialog = ({
  open,
  onClose,
  lead,
  refresh,
}) => {
  const [loading, setLoading] = useState(false);

  if (!lead) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteLead(lead._id);

      toast.success("Lead deleted successfully!");

      refresh();
      onClose();
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
          "Failed to delete lead"
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Lead</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to delete
            <strong> "{lead.name}"</strong>?
          </p>

          <p className="text-sm text-red-500 mt-2">
            This action cannot be undone.
          </p>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLeadDialog;