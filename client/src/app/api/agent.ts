import axios, {AxiosError, AxiosResponse} from "axios";
import { resolve } from "path";
import { toast } from "react-toastify";
import { history } from "../..";

//set 1000(1 sec) delay to show laoding indicator
const sleep = () => new Promise(resolve => setTimeout(resolve, 200));

axios.defaults.baseURL = 'http://localhost:5500/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;
//the above line is similar to this function below
// function responseBodyFn(response: AxiosResponse){
//     return response.data;
// }

axios.interceptors.response.use(async response => {
    await sleep();
    return response
},(error: AxiosError) => {
    //error.response! overrides the type safety(typescript)
    //it says response is always there
    const {data, status} = error.response!;
    switch (status) {
        case 400:
            //validation errors
            if (data.errors){
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            history.push({
                pathname: '/server-error',
                state: {error: data}
            });
            break;
    
        default:
            break;
    }

    return Promise.reject(error.response);
})

//post and put requests will have body, so we need to send body
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products'),
    //here id datatype is number and we provided base url above, 
    //so just products/${id} after that
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const Basket = {
    //basket is url for basket controller
    get: () => requests.get('basket'),
    //quantity is defaulted to 1, and productId should be same as the variable declare
    //in BasketController AddItemToBasket post method, {} we need to pass empty object also
    //with this request
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent;