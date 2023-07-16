import axios from "axios";
import { Loading } from "notiflix";

axios.defaults.headers.common["x-api-key"] = "live_g2g82O7Ii5WMyBy2RsHyX4dfGTHhnSOULbk61GeRgHZBLkpUEjhLIglcxLLSYrjT";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get('/breeds/')
    .then(response => {
        if(response.status !== 200){
            throw new Error(response.status)
        }
        return response.data;
    });
}

export function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?limit=4&breed_ids=${breedId}&width=800&height=400`)
    .then(response => {
        if(response.status !== 200){
            throw new Error(response.status)
        }
        return response.data;
    });
}



