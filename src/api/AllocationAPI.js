import axios from "axios";

export const AllocationAPI = axios.create({
    baseURL : "",
    headers : {},
    timeout : 10000
})

AllocationAPI.interceptors.response.use(
    (response)=> response,
    (error)=>{
        return Promise.reject({message : "Network Error, Please try again"});
    }
)