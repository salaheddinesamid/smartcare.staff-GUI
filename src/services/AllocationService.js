import { AllocationAPI } from "../api/AllocationAPI";
// fetch all the allocation requests
export const getAllocationRequests = async()=>{
    const response = await AllocationAPI.get();
    return response.data;
}
// fetch all the allocations from the server:
export const getAllocations = async()=>{
    const response = await AllocationAPI.get("/requests/get_all");
    return response.data;
}