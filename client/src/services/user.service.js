import {authAxiosService, axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const userService = {
    sendEmail: (email) => axiosService.post(urls.forgotPassword, email),
    restorePassword: (password, token) => {
        axiosService.interceptors.request.use((config) => {
            config.headers.Authorization = token;
            return config;
        })
        return axiosService.put(urls.forgotPassword, {password});
    },
    getAll: (id) => authAxiosService.get(`${urls.users}/${id}`).then(value => value.data),
    updateById: (id, user) => authAxiosService.put(`${urls.users}/${id}`, user).then(value => value.data),
    deleteById: (id) => authAxiosService.delete(`${urls.users}/${id}`)
}