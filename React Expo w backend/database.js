import { useState } from "react";

export const login = async ({ email, password }) => {
  const url = "http://172.22.26.6:3000/api/login";
  const option = {
    method: "POST",
    headers: {
       accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  };

  const res = await fetch(url, option);

  const data = await res.json();
  console.log(data)
  return data;
};

export const signup = async ({ email, password }) => {
  const url = "http://172.22.26.6:3000/api/signup";
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  };

  const res = await fetch(url, option);
  const data = await res.json();
  console.log(data);
  return data;
};
