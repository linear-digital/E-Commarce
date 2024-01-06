import { CURRENTUSER } from "./constants";


export const setCurrentUser = (user) => ({
    type: CURRENTUSER,
    payload: user
})
