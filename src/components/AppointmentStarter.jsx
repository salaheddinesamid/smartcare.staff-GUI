import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { startAppointment } from '../services/AppointmentService';

export const AppointmentStarter = ({ID})=>{

    const navigate = useNavigate();

    // Function that handles starting an appointment session
    const handleStartSession = async()=>{
        try{
            console.log("Appointment Id:", ID)
            // Start the session in the server:
            const response = await startAppointment(ID);
            console.log(response);

            // Return a server response:
            const {appointmentId, duration} = response;

            // Navigate to session page:
            navigate(`/appointment/session-start/${appointmentId}`, {
                state : {response,duration}
            }
            );
        }
        catch(err){
            console.error(err.data);
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