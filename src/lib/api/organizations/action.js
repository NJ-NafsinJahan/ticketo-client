"use client";

import { serverMutation } from "../server";

// for add organization
export const addOrganization = async (data) => {
  const resData = await serverMutation("/api/organizations", "POST", data);
  return resData;
};

// for update organization data
export const updateOrganization = async (data, id) => {
  console.log(data, id, "data and id from action.js");
  const resData = await serverMutation(
    `/api/organizations/${id}`,
    "PATCH",
    data,
  );
  return resData;
};
