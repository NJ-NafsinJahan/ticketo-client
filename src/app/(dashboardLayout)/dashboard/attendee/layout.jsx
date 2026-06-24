import { roleValidator } from "@/lib/api/session";
import React from "react";

const AttendantLayout = async ({ children }) => {
  await roleValidator("attendee"); //for role validation
  return children;
};

export default AttendantLayout;
