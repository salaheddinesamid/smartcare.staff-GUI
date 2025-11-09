import { RoomAllocationAPI } from "../api/RoomAllocationAPI"

export const getAllocations = async()=>{
    const response = await RoomAllocationAPI.get("get_all");
    return response.data;
}