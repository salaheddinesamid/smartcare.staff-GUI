import axios from "axios";


export const PharmacyAPI = axios.create({
    baseURL : process.env.REACT_APP_PHARMACY_SERVICE,
    headers : {},
    timeout : 10000
});

PharmacyAPI.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(!error.response){
            console.error("Network Error",error);
            return Promise.reject({message : "Network Error, Please try again"});
        }
    }
)