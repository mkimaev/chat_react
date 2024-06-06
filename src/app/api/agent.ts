import axios, { AxiosError, AxiosResponse } from "axios";
import { IMessageFromBot } from "../models/message";
import { toast } from "react-toastify";
import { IPlaceHolderUser } from "../models/user";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.response.use(async response => {

    if (import.meta.env.DEV) {
        await sleep(500);
    }

    return response;

}, (error: AxiosError) => {
    const { data, status /*,config*/ } = error.response as AxiosResponse;

    switch (status) {
        case 400:
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw new TypeError(modalStateErrors.flat().toString());
            }
            else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            toast.error('not found');
            break;
        case 500:
            toast.error('server error');
            break;
    }

    return Promise.reject(error);
});

const responseBody = function<T>(response: AxiosResponse<T>){
    return response.data;
}

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody<T>),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody<T>),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody<T>),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody<T>)
}

const Messages = {
    sendRequest: (queryText: string) => requests.get<IMessageFromBot[]>(`?query=${queryText}`),
}

const Jsonplaceholder = {
    getUsers: () => requests.get<IPlaceHolderUser[]>(`https://jsonplaceholder.typicode.com/users`),
    getPosts: () => requests.get<any>(`https://jsonplaceholder.typicode.com/posts`),
}

const agent = {
    Messages,
    Jsonplaceholder
}

export default agent;