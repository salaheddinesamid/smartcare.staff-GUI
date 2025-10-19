import axios from "axios";

const patientApi = axios.create({
    baseURL : process.env.REACT_APP_PATIENT_SERVICE,
    headers : {},
    timeout : 10000
})

patientApi.interceptors.response.use(
    (response)=> response,
    (error)=> {
        if(!error.response){
            console.error("Network Error",error);
            return Promise.reject({message : "Network Error, Please try again"});
        }
    }
)

export default patientApi;