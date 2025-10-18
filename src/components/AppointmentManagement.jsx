import React, { useEffect, useState } from "react";
import "./Appointment.css";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"
import axios from "axios";

export const AppointmentManagement = ()=>{

    const APPOINTMENT_SERVICE_URI = process.env.REACT_APP_APPOINTMENT_SERVICE;

    const filters = [
        {id : 1, name: "Recent", value : "SCHEDULED"},
        {id : 1, name: "Completed", value : "COMPLETED"}
    ]
    const [appointments,setAppointments] = useState([]);
    const [currentFilter,setCurrentFilter] = useState("All");
    const [loading,setLoading] = useState(false);

    const handleChangeFilter = (filter) =>{
        setCurrentFilter(filter);
    }

    //const filteredAppointments = appointments.filter((appointment)=> appointment.status === currentFilter);

    const fetchAppointments = async()=>{
        let uri = APPOINTMENT_SERVICE_URI + "/api/appointment/get_all";
        try{
            setLoading(true);
            let res = await axios.get(uri);
            setAppointments(res.data.data);
            console.log(res)

        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchAppointments();
    },[])



    const Header  = ()=>{
        return(
            <div className="row">
                <div className="col-xl-5 d-flex ps-3 pe-3">
                    {filters.map((filter)=>(
                        <button className="filter-btn" onClick={()=>handleChangeFilter(filter.value)}>{filter.name}</button>
                    ))}
                </div>
                <div className="col-xl-7">

                </div>
            </div>
        )
    }

    const AppointmentsTable = () =>{
        return(
            <div className="row">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Start Date</TableCell>
                                <TableCell>Doctor Name</TableCell>
                                <TableCell>Patient Name</TableCell>
                                <TableCell>Disease</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {appointments && appointments.map((appointment)=>(
                                <TableRow>
                                    <TableCell>{appointment.startDate}</TableCell>
                                    <TableCell>{appointment.doctorInformation.firstName}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
    return(
        <div className="row" style={{
            width : "100%",
            height : "80vh"
        }}>
            {/**<Header/>**/}
            <AppointmentsTable/>
        </div>
    )
}