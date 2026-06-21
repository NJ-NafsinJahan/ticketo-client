import { baseURL } from "./baseUrl";

export const serverMutation = async (path, method, data) => {
  //   console.log(data, "from server mutation");
  //   console.log(baseURL, path, "from server mutation");

  const res = await fetch(`${baseURL}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseURL}/${path}`);
  return res.json();
};
