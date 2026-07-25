import api from "./api";

export const submitLead = async (data) => {
  const res = await api.post("/leads/public", data);
  return res.data;
};