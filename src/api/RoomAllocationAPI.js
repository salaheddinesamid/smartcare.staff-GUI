import axios from "axios";

export const RoomAllocationAPI = axios.create({
    baseURL : "",
    headers : {},
    timeout : 10000
})

RoomAllocationAPI.interceptors.response.use(
    (response)=> response,
    (error)=>{
        return Promise.reject({message : "Network Error, Please try again"});
    }
)