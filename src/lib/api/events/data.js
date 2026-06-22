import { serverFetch } from "../server";

export const myEvents = async (email) => {
  const result = await serverFetch(`/api/events/${email}`);
  console.log(result, "Manage events");
  return result;
};
