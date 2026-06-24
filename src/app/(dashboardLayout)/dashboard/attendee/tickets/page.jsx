import DashboardHeading from "@/components/DashboardHeading";
import TicketsTable from "@/components/TicketsTable";
import { fetchMyBooking } from "@/lib/api/bookings/data";
import { getUser } from "@/lib/api/session";
import React, { use } from "react";

const attendeeTicketsPage = async () => {
  const user = await getUser();
  console.log(user, "user attendee tickets");

  const bookings = await fetchMyBooking(user?.email);
  console.log(bookings, "attendee tickets");
  return (
    <div>
      <DashboardHeading
        title="My Booked Ticked"
        description="All Ticket I Booked"
      />
      <TicketsTable tickets={bookings}></TicketsTable>
    </div>
  );
};

export default attendeeTicketsPage;
