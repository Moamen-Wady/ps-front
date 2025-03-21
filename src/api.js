import axios from "axios";

export default axios.create({
  withCredentials: true,
  // baseURL: "http://localhost:3005",
  baseURL: "https://ps-back.vercel.app:3005",
});

export const isCancel = (err) => axios.isCancel(err);
