import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://spotify-backend-eye-970634887ce3.herokuapp.com",
})