"use client";

import { serverMutation } from "../server";

export const addOrganization = async (data) => {
  const resData = await serverMutation("/api/organizations", "POST", data);
  return resData;
};
