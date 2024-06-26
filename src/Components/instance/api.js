import axios from "axios";
import Cookies from "js-cookie";

// export const local = process.env.NEXT_PUBLIC_LOCAL_URL
// export const local = 'https://desired-platypus-pleasing.ngrok-free.app/'
export const local = 'http://localhost:4000/'
export const locals = 'https://server.linearhub.com/'
export const localURL = locals

export const api = axios.create({
    baseURL: locals,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
})