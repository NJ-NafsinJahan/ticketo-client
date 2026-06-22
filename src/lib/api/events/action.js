"use client";

import { serverMutation } from "../server";

// for add organization
export const addEvent = async (data) => {
  const resData = await serverMutation("/api/events", "POST", data);
  return resData;
};

// for update organization data
export const updateEvent = async (data, id) => {
  console.log(data, id, "data and id from action.js");
  const resData = await serverMutation(`/api/events/${id}`, "PATCH", data);
  return resData;
};
