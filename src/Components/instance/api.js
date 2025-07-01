import axios from "axios";
import Cookies from "js-cookie";

const isBrowser = typeof window !== 'undefined';

// Set the base URL based on environment
export const local = 'http://localhost:4000/';
export const production = 'https://server.oftechgadget.com/';
export const localURL = production; // Change this based on environment

// Create an Axios instance
export const api = axios.create({
  baseURL: localURL,
  headers: {
    'Content-Type': 'application/json',
    ...(isBrowser && {
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    }),
  },
});

// Universal fetcher with method, body, and token support
export const fetcher = async ({
  path,
  data,
  method = "GET",
  headers = {},
  token = null,
  revalidate = 3600, // ✅ default revalidate time in seconds (1 hour)
  dynamic = false,   // ✅ if true, forces dynamic rendering
}) => {
  try {
    const url = path.startsWith("/") ? path.slice(1) : path;

    const finalHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (isBrowser && Cookies.get("auth_token")) {
      finalHeaders.Authorization = `Bearer ${Cookies.get("auth_token")}`;
    } else if (token) {
      finalHeaders.Authorization = `Bearer ${token}`;
    }

    const fetchOptions = {
      method,
      headers: finalHeaders,
      body: method === "GET" ? null : JSON.stringify(data),
      ...(dynamic
        ? { cache: "no-store" }
        : { next: { revalidate } }), // ✅ Conditional cache policy
    };

    const res = await fetch(localURL + url, fetchOptions);

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API fetch error:", {
      message: error.message,
      path,
      method,
    });
    throw error;
  }
};