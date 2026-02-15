import api from "./api";

// send exchange request
export const requestExchange = async (postId) => {
  const { data } = await api.post("/exchanges", { postId });
  return data;
};

// get incoming requests
export const getIncoming = async () => {
  const { data } = await api.get("/exchanges/incoming");
  return data;
};

// get outgoing requests
export const getOutgoing = async () => {
  const { data } = await api.get("/exchanges/outgoing");
  return data;
};

// accept request
export const acceptExchange = async (id) => {
  const { data } = await api.put(`/exchanges/${id}/accept`);
  return data;
};

// reject request
export const rejectExchange = async (id) => {
  const { data } = await api.put(`/exchanges/${id}/reject`);
  return data;
};
