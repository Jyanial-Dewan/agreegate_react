/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";
import axios from "axios";
// import { RawAxiosRequestHeaders } from "axios";

interface loadDataParams {
  baseURL: string;
  url: string;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  accessToken?: string;
  isToast?: boolean;
}

interface postDataParams {
  baseURL: string;
  url: string;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  payload: any;
  isConsole?: boolean;
  isToast?: boolean;
  accessToken?: string;
}

interface putDataParams {
  baseURL: string;
  url: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  payload: any;
  isConsole?: boolean;
  isToast?: boolean;
  accessToken?: string;
}

interface deleteDataParams {
  url: string;
  baseURL?: string;
  payload?: any;
  accessToken?: string;
  isToast?: boolean;
}

export const nodeURL = import.meta.env.VITE_NODE_ENDPOINT_URL;

export const api = axios.create({
  baseURL: nodeURL,
  headers: { "Content-Type": "application/json" },

  withCredentials: true,
});

export async function loadData(params: loadDataParams) {
  try {
    if (params.setLoading) {
      params.setLoading(true);
    }
    const res = await api.get(`${params.url}`, {
      baseURL: params.baseURL,
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    });
    if (res) {
      return res;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (params.isToast) {
        toast(error.message);
      }
    }
    return undefined;
  } finally {
    if (params.setLoading) {
      params.setLoading(false);
    }
  }
}

export async function postData(params: postDataParams) {
  try {
    if (params.setLoading) {
      params.setLoading(true);
    }
    const res = await api.post(`${params.url}`, params.payload, {
      baseURL: params.baseURL,
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    });
    if (res.status === 201 || res.status === 200) {
      if (params.isToast) {
        toast(res.data.message);
      }
      return res as any;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (params.isToast) {
        toast(error.message);
      }
      return error.message;
    }
  } finally {
    if (params.setLoading) {
      params.setLoading(false);
    }
  }
}

export async function putData(params: putDataParams) {
  try {
    params.setLoading(true);
    const res = await api.put(`${params.url}`, params.payload, {
      baseURL: params.baseURL,
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    });
    if (res.status === 200) {
      if (params.isToast) {
        toast(res.data.message);
      }
      return res as any;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (params.isToast) {
        toast(error.message);
      }
      return error.message;
    }
  } finally {
    params.setLoading(false);
  }
}

export async function deleteData(params: deleteDataParams) {
  try {
    const res = await api.delete(`${params.url}`, {
      baseURL: params.baseURL,
      data: params.payload,
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    });

    if (res.status === 200) {
      if (params.isToast) {
        toast(res.data.message);
      }
      return res as any;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (params.isToast) {
        toast(error.message);
      }
      return error.message;
    }
  }
}
