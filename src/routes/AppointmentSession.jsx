import { useEffect, useState } from "react"
import { startAppointment } from "../services/AppointmentService";
import { useLocation } from "react-router-dom";

export const AppointmentSession = ()=>{

    const location = useLocation();

    const appointment = location?.state.appointmentDetails;
    const [timeLeft,setTimeLeft] = useState(location.state?.duration);

    const MockAppointment = {
        id: 1,
        doctorName: "",
        PatientName: "",
        startDate: "",
        duration: 2
    };
    return(
        <div className="row">
            <h3>Here we will start the session id</h3>
        </div>
    )
}