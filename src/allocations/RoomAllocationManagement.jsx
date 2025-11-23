import { Chip, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useState } from "react"
import { getAllocations } from "../services/RoomAllocationService";
import { AllocationRequestDetails } from "./dialog/AllocationRequestDetails";
import { RoomManagement } from "./components/RoomManagement";
import { AllocationRequestManagement } from "./components/AllocationRequestManagement";
import { AllocationManagement } from "./components/AllocationManagement";

export const RoomAllocationManagement = ()=>{

    const [selectedComponent,setSelectedComponent] = useState(1);
    const components = [
        {id : 1, name : "Rooms & Beds", view : <RoomManagement/>},
        {id : 2, name : "Allocation Requests", view : <AllocationRequestManagement/>},
        {id : 3, name : "Room Allocations", view : <AllocationManagement/>}
    ]

    return(
        <div className="row">
            <div style={{ display: "flex", gap: "10px", margin: "0px 0px" }}>
                {components?.map((c)=>(
                    <p key={c.id}
                    style={{
                        cursor: "pointer",
                        borderBottom: c.id === selectedComponent ? "2px solid #004170" : "",
                        }}
                        onClick={()=> setSelectedComponent(c?.id)}>
                        {c.name}
                    </p>
                ))}
            </div>
        </div>
    )
}