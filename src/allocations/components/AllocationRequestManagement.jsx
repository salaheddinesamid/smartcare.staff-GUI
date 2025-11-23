import { Chip, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react"
import { AllocationRequestDetails } from "../dialog/AllocationRequestDetails";
import { getAllocationRequests } from "../../services/AllocationService";


export const AllocationRequestManagement = ()=>{

    const [loading,setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [selectedRequest,setSelectedRequest] = useState(null);
    const [requestDetailsDialogOpen,setRequestDetailsDialogOpen] = useState(false);

    const handleOpenRequestDialog = (r)=>{
        setSelectedRequest(r);
        setRequestDetailsDialogOpen(true);
    }

    const handleCloseRequestDialog = ()=>{
        setSelectedRequest(null);
        setRequestDetailsDialogOpen(false)
    }

    // fetch the requests from the server
    const fetchRequests = async()=>{
        try{
            setLoading(true);
            const res = await getAllocationRequests();
            setRequests(res);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[])
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
                    
                    {requests && requests.map((r)=>(
                        <TableRow key={r.id}>
                            <TableCell># <b>{r.id}</b></TableCell>
                            <TableCell>{r.admissionDate}</TableCell>
                            <TableCell>{r.fullName}</TableCell>
                            <TableCell>{r.issue}</TableCell>
                            <TableCell>
                                {
                                    r?.priority === "HIGH" ? <Chip label="High" color="#ba000d"/> : ""
                                }
                            </TableCell>
                            <TableCell>{r.roomNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <AllocationRequestDetails open={requestDetailsDialogOpen}/>
            </Paper>
    )
}