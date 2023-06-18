import {authAxiosService, axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const brandsService = {
    create: (brand) => authAxiosService.post(urls.brands, brand).then(value => value.data),
    getAll: () => axiosService.get(urls.brands).then(value => value.data)
}