import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://spotify-backend-eye-abcd393e34b5.herokuapp.com/api",
})