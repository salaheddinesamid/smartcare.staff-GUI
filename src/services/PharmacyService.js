import { PharmacyAPI } from "../api/PharmacyAPI"

export const getAllMedicines = async()=>{
    const response = await PharmacyAPI.get("/api/pharmacy/medicines/get_all");
    return response.data;
}

export const addNewMedicine = async(requestDto)=>{
    const response = await PharmacyAPI.post("/api/pharmacy/add-medicine",requestDto);
    return response.status;
}

export const removeMedicine = async()=>{
    const response = await PharmacyAPI.delete();
    return response.status;
}

export const searchMedicine = async(searchQuery)=>{
    const response = await PharmacyAPI.get("/api/pharmacy/search",{
        params : {
            name: searchQuery,
            refNumber : searchQuery
        }
    })

    return response.data;
}