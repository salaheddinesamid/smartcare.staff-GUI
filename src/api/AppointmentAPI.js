import axios from "axios";

const AppointmentAPI = axios.create({
    baseURL : process.env.REACT_APP_APPOINTMENT_SERVICE,
    headers : {},
    timeout : 10000
})

AppointmentAPI.interceptors.response.use(
    (response)=> response,
    (error)=> {

    }
)

export default AppointmentAPI;