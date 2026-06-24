import { serverFetch } from "../server";

export const fetchMyPayments = async (email) => {
  const result = await serverFetch(`/api/payment/${email}`);
  return result;
};
