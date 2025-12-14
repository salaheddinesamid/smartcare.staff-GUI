import axios from "axios";

export const EquipmentAPI = axios.create({
    baseURL : `${process.env.REACT_APP_HOSPITAL_OPERATIONS_SERVICE}/api/v1/equipments`,
    headers : {},
    timeout : 10000
})

EquipmentAPI.interceptors.response.use(
    (response)=> response,
    (error)=>{
        return Promise.reject({message : "Network Error, Please try again"});
    }
)