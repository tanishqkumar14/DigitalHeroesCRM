import { useState } from "react";
import { submitLead } from "../services/publicLead";

const PublicLeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "Website",
    value: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");

    try {
      await submitLead({
        ...formData,
        value: Number(formData.value || 0),
      });

      setSuccess(
        "🎉 Thank you! Your enquiry has been submitted successfully."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "Website",
        value: "",
      });
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Something went wrong."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-xl border border-gray-200 p-10">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Contact Our Sales Team
          </h1>

          <p className="mt-3 text-gray-500">
            Fill in your details and our team will get back to you.
          </p>

        </div>

        {success && (
          <div className="mb-6 rounded-xl bg-green-100 border border-green-300 p-4 text-green-700 font-medium">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="mb-2 block font-medium">
              Full Name
            </label>

            <input
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Phone
              </label>

              <input
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Company
            </label>

            <input
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="mb-2 block font-medium">
                Lead Source
              </label>

              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full rounded-xl border p-3"
              >
                <option>Website</option>
                <option>Referral</option>
                <option>LinkedIn</option>
                <option>Email</option>
                <option>Cold Call</option>
              </select>

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Estimated Deal Value
              </label>

              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                placeholder="5000"
                className="w-full rounded-xl border p-3 outline-none focus:border-blue-500"
              />

            </div>

          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-4 text-white font-semibold transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading
              ? "Submitting..."
              : "Submit Lead"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default PublicLeadForm;