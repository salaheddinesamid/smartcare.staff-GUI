import { RoomAllocationAPI } from "../api/RoomAllocationAPI"

export const getAllocationRequests = async()=>{
    const response = await RoomAllocationAPI.get();
    return response.data;
}
export const getAllocations = async()=>{
    const response = await RoomAllocationAPI.get("/requests/get_all");
    return response.data;
}