import AppointmentAPI from "../api/AppointmentAPI"

export const getAllDoctorAppointments = async(doctorId)=>{
    const response = await AppointmentAPI.get("/api/appointment/doctor/get_all?doctorId=" + doctorId)
    return response.data;
}

export const getAllDoctorAppointmentsByDate = async(doctorId,date)=>{
    const response = await AppointmentAPI.get(`/api/appointment/doctor/get-by-date?doctorId=${doctorId}&?date=${date}`);
    return response.data;
}

export const startAppointment = async(appointmentId)=>{
    const response = await AppointmentAPI.put("/api/appointment/start-session",null,{
        params : {
            appointmentId : appointmentId
        }
    })
    return response.data;
}

export const endAppointmentSession = async(appointmentId)=>{
    const response = await AppointmentAPI.put();
    return response.status;
}