import {authAxiosService} from "./axios.service";
import {urls} from "../configs/urls";

export const analyticsService = {
    getAll: () => authAxiosService.get(urls.analytics).then(value => value.data),
    updateById: (id, analytic) => authAxiosService.put(`${urls.analytics}/${id}`, analytic).then(value => value.data)
}