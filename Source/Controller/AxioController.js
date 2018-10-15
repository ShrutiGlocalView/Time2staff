import React from 'react';
import axios from 'axios';
//import Axios from '../Config/AxiosConfig';
const baseUrl = 'https://time2staffdev.azurewebsites.net/backend/public/api/';
export async function defaultPostCall(url,params){
         var body = JSON.stringify(params);
        return axios.post(baseUrl+url,params);
}
