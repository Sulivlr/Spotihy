import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { API_URL } from "./config";
import { RootState } from "./app/store";
import { Store } from "@reduxjs/toolkit";

const axiosApi = axios.create({
  baseURL: API_URL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set("Authorization", token);
    return config;
  });
};

export default axiosApi;
