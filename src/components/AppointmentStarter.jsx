import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { startAppointment } from '../services/AppointmentService';

export const AppointmentStarter = ({appointmentId})=>{

    const navigate = useNavigate();
    const APPOINTMENT_SERVICE_URI = process.env.REACT_APP_APPOINTMENT_SERVICE;

    // Function that handles starting an appointment session
    const handleStartSession = async()=>{
        try{
            // Start the session in the server:
            const response = await startAppointment(appointmentId);

            // Return a server response:
            const {appointmentId, duration} = response.data;

            // Navigate to session page:
            navigate(`/appointment/session-start/${appointmentId}`, {duration, response});
        }
        catch(err){
            console.error(err);
        }
    }
    return(
        <div className="row">
            <Button onClick={handleStartSession}>
                <PlayCircleFilledWhiteIcon/>
            </Button>
        </div>
    )
}