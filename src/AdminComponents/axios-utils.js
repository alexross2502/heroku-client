import axios from "axios";
import { getToken } from "./token";

const client = axios.create({baseURL : 'https://mysqltest.herokuapp.com/api'})

export const request = ({...option}) => {
    client.defaults.headers.common.Authorization = getToken()
    const onSuccess = responce => responce.data
    const onError = error => {
        //console.log(error.response.status)
        return error
    }

    return client(option).then(onSuccess).catch(onError)
}