import { EquipmentAPI } from "../api/EquipmentAPI";
import { RoomAPI } from "../api/RoomAPI";


// Fetching all the rooms from the server:
export const getAllRooms = async()=>{
    const response = await RoomAPI.get("/get_all");
    return response.data;
}

// Add new room to the system:
export const addRoom = async(request)=>{
    const response = await RoomAPI.post("new",request);
    return response.status; // returns 200, 401,...
}

// Fetch equipments from the system:
export const fetchEquipments = async()=>{
    const response = await EquipmentAPI.get("get_all")
    return response.data;
}