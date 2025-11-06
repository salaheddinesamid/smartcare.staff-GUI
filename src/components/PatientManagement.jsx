import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
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
        <div className="row">
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
                        <TableCell></TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
    )
}