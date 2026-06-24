import { serverFetch } from "../server";

export const fetchMyBooking = async (email) => {
  const result = await serverFetch(`/api/events/booking/${email}`);
  //   console.log(result, "fetch My Booking");
  return result;
};
