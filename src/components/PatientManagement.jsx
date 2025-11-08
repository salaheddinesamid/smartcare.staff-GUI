import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { getPatients } from "../services/PatientService";


export const PatientManagement = ()=>{

    const [patients,setPatients] = useState([]);
    const [loading,setLoading] = useState(false);

    const fetchPatients = async()=>{
        try{
            setLoading(true);
            const res = await getPatients();
            setPatients(res.data);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchPatients();
    },[])

    return(
        <Paper elevation={4}
        sx={{
            p: 3,
            mt: 4,
            borderRadius: 4,
            background: "#fafafa",
        }}>
            <Table>
              <TableHead>
                <TableRow>
                    <TableCell>Patient Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Disease</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {patients && patients.map((patient)=>(
                    <TableRow>
                        <TableCell>{patient?.firstName} {patient?.lastName}</TableCell>
                        <TableCell>{0}</TableCell>
                        <TableCell>{"NONE"}</TableCell>
                        <TableCell>{"NONE"}</TableCell>
                        <TableCell>{patient?.email}</TableCell>
                        <TableCell>{}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
        </Paper>
    )
}