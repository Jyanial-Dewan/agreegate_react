import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: backend === "flask" ? "" : "http://localhost:3000",
});
