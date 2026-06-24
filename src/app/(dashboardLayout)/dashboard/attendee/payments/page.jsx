import DashboardHeading from "@/components/DashboardHeading";
import PaymentsTable from "@/components/PaymentsTable";
import { fetchMyPayments } from "@/lib/api/payments/data";
import { getUser } from "@/lib/api/session";
import React from "react";

const attendeePayments = async () => {
  const user = await getUser();
  console.log(user, "user at attendee payments");

  const payments = await fetchMyPayments(user?.email);
  console.log(payments, "attendee payments");
  return (
    <div>
      <DashboardHeading
        title="All payments"
        description="My payments overview"
      />
      <PaymentsTable payments={payments}></PaymentsTable>
    </div>
  );
};

export default attendeePayments;
