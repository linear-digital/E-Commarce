import axios from "axios";
import Cookies from "js-cookie";
export const api = axios.create({
    baseURL: 'https://linear-hub-server.vercel.app',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("token")}`,
    },
})