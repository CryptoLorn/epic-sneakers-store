import {authAxiosService, axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const typeService = {
    create: (type) => authAxiosService.post(urls.types, type).then(value => value.data),
    getAll: () => axiosService.get(urls.types).then(value => value.data)
}