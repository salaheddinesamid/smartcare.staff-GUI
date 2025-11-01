import { PharmacyAPI } from "../api/PharmacyAPI"

export const getAllMedicines = async()=>{
    const response = await PharmacyAPI.get("/api/pharmacy/get_all");
    return response.data;
}