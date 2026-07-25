import api from "./api";

export const getLeads = (params) =>
  api.get("/leads", { params });

export const createLead = (data) =>
  api.post("/leads", data);

export const updateLead = (id, data) =>
  api.put(`/leads/${id}`, data);

export const deleteLead = (id) =>
  api.delete(`/leads/${id}`);

export const getDashboardStats = () =>
  api.get("/leads/dashboard");