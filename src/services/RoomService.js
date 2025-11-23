import { RoomAPI } from "../api/RoomAPI";


// Fetching all the rooms from the server:
export const getAllRooms = async()=>{
    const response = await RoomAPI.get("/get_all");
    return response.data;
}