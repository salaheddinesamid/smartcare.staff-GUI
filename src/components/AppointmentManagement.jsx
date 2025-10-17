import React, { useState } from "react";
import "./Appointment.css";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"

export const AppointmentManagement = ()=>{

    const filters = [
        {id : 1, name: "Recent", value : "New"},
        {id : 1, name: "Completed", value : "Completed"}
    ]
    const [currentFilter,setCurrentFilter] = useState("All");

    const handleChangeFilter = (filter) =>{
        setCurrentFilter(filter);
    }



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

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
    return(
        <div className="row" style={{
            width : "100%"
        }}>
            <Header/>
            <AppointmentsTable/>
        </div>
    )
}