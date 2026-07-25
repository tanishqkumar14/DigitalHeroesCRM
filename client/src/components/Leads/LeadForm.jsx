import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
  company: z.string().min(2, "Company is required"),
  source: z.string().min(1, "Select a source"),
  status: z.string().min(1, "Select a status"),
  priority: z.string().min(1, "Select priority"),
  value: z.coerce.number().min(0, "Value must be positive"),
  notes: z.string().optional(),
});

const emptyLead = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "",
  status: "New",
  priority: "Medium",
  value: 0,
  notes: "",
};

const LeadForm = ({
  defaultValues,
  onSubmit,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: emptyLead,
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name || "",
        email: defaultValues.email || "",
        phone: defaultValues.phone || "",
        company: defaultValues.company || "",
        source: defaultValues.source || "",
        status: defaultValues.status || "New",
        priority: defaultValues.priority || "Medium",
        value: defaultValues.value ?? 0,
        notes: defaultValues.notes || "",
      });
    } else {
      reset(emptyLead);
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <Label>Name</Label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label>Email</Label>
        <Input type="email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label>Phone</Label>
        <Input {...register("phone")} />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <Label>Company</Label>
        <Input {...register("company")} />
        {errors.company && (
          <p className="text-red-500 text-sm mt-1">
            {errors.company.message}
          </p>
        )}
      </div>

      <div>
        <Label>Source</Label>
        <select
          {...register("source")}
          className="w-full border rounded-md p-2"
        >
          <option value="">Select Source</option>
          <option value="Website">Website</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Cold Call">Cold Call</option>
          <option value="Email">Email</option>
        </select>

        {errors.source && (
          <p className="text-red-500 text-sm mt-1">
            {errors.source.message}
          </p>
        )}
      </div>

      <div>
        <Label>Status</Label>
        <select
          {...register("status")}
          className="w-full border rounded-md p-2"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <div>
        <Label>Priority</Label>
        <select
          {...register("priority")}
          className="w-full border rounded-md p-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <Label>Deal Value</Label>
        <Input
          type="number"
          {...register("value")}
        />
      </div>

      <div>
        <Label>Notes</Label>
        <Textarea
          rows={4}
          {...register("notes")}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Lead"}
      </Button>
    </form>
  );
};

export default LeadForm;