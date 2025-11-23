import axios from "axios";

export const RoomAPI = axios.create({
    baseURL : `${process.env.REACT_APP_HOSPITAL_OPERATIONS_SERVICE}/api/v1/room-management`,
    headers : {},
    timeout : 10000
})

RoomAPI.interceptors.response.use(
    (response)=> response,
    (error)=>{
        return Promise.reject({message : "Network Error, Please try again"});
    }
)