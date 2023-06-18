import {axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const basketService = {
    getById: (id) => axiosService.get(`${urls.baskets}/${id}`).then(value => value.data)
}