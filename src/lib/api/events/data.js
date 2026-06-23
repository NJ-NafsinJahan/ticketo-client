import { serverFetch } from "../server";

export const myEvents = async (email) => {
  const result = await serverFetch(`/api/events/${email}`);
  console.log(result, "Manage events");
  return result;
};

// for browse events page
export const fetchEvents = async (query) => {
  const result = await serverFetch(`/api/events?${query.toString()}`);
  // console.log(result, "browse events");
  return result;
};
