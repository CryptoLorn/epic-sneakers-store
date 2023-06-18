import {authAxiosService, axiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const ordersService = {
    create: (orders) => authAxiosService.post(urls.orders, orders).then(value => value.data),
    getAllById: (basketId) => axiosService.get(urls.orders, {params: {basketId}}).then(value => value.data),
    deleteById: (id) => authAxiosService.delete(`${urls.orders}/${id}`),
    deleteAllByBasketId: (id) => authAxiosService.delete(`${urls.orders}/all/${id}`)
}