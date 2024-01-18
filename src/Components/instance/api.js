import axios from "axios";
import Cookies from "js-cookie";

export const local = process.env.NEXT_PUBLIC_LOCAL_URL
export const localURL = local

export const api = axios.create({
    baseURL: local,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("token")}`,
    },
})