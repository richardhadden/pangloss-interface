import { createApiClient } from "../schema";

export const apiClient = createApiClient("http://localhost:8000", {axiosConfig: {
    withCredentials: true
  }});