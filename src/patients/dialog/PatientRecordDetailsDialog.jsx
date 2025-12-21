import { useEffect, useState } from "react"

export const PatientRecordDialog = ({open, onClose, patientId})=>{

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const fetchPatientRecord = async()=>{

        try{
            setLoading(true);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchPatientRecord(patientId);
    },[patientId])

    return(
        <div className="row"></div>
    )
}