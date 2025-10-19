import AppointmentAPI from "../api/AppointmentAPI"

export const getAllAppointments = async(doctorId)=>{
    const response = await AppointmentAPI.get("/api/appointment/doctor/get_all?doctorId=" + doctorId)
    return response.data;
}