import { Chip, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useState } from "react"
import { getAllocations } from "../services/RoomAllocationService";
import { AllocationRequestDetails } from "./dialog/AllocationRequestDetails";

export const RoomAllocationManagement = ()=>{

    const AllocationTable = ()=>{
        const [allocations,setAllocations] = useState([]);
        const [mockAllocations,setMockAllocations] = useState([
            {id : 1, admissionDate:"2025-11-03T11:00:00PM", fullName : "Salaheddine Samid", issue : "Blood HP", priority : "HIGH", roomNumber:202}
        ])
        const [loading,setLoading] = useState(false);

        const fetchAllocations = async()=>{
            try{
                setLoading(true);
                const res = await getAllocations();
                setAllocations(res);
            }catch(err){
                console.log(err);
            }finally{
                setLoading(true);
            }
        };

        const PriorityMapper = (p)=>{
            switch(p){
                case "HIGH":
                    return {label : "HIGH", chipColor : "warning"}
            }
        }
        return(
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Admission Date</TableCell>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Issue</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Room N°</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && (
                            <CircularProgress/>
                        )}
                        {mockAllocations && mockAllocations.map((allocation)=>(
                            <TableRow key={allocation.id}>
                                <TableCell># <b>{allocation.id}</b></TableCell>
                                <TableCell>{allocation.admissionDate}</TableCell>
                                <TableCell>{allocation.fullName}</TableCell>
                                <TableCell>{allocation.issue}</TableCell>
                                <TableCell>
                                    {
                                        allocation?.priority === "HIGH" ? <Chip label="High" color="#ba000d"/> : ""
                                    }
                                </TableCell>
                                <TableCell>{allocation.roomNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <AllocationRequestDetails open={true}/>
            </Paper>
        )
    }

    return(
        <div className="row">
            <AllocationTable/>
        </div>
    )
}