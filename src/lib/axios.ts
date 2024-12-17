import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://spotify-eye-ic6bk.ondigitalocean.app/api",
})