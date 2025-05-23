import axios from "axios";
import Cookies from "js-cookie";

// export const local = process.env.NEXT_PUBLIC_LOCAL_URL
// export const local = 'https://desired-platypus-pleasing.ngrok-free.app/'
export const local = 'http://localhost:4000/'
export const locals = 'https://server.oftechgadget.com/'
export const localURL = locals

export const api = axios.create({
    baseURL: localURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
})

export const fetcher = async ({ path, data, method = "GET", headers = {} }) =>
{
    try {
        // if path startwith / remove it
        const url =  path.startsWith("/") ? path.slice(1) : path
        const res = await fetch(localURL + url, {
            method,
            headers: {
                ...headers,
                Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (error) {
        throw error
    }
};