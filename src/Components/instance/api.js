import axios from "axios";
import Cookies from "js-cookie";

export const local = 'http://localhost:4000/'
export const localURL = local
export const server = "https://linear-hub-server.vercel.app"

export const api = axios.create({
    baseURL: local,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("token")}`,
    },
})