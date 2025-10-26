import patientApi from "../api/PatientApi";

export const getPatients = async()=>{
    const response = await patientApi.get("/api/patient-management/get_all");
    return response.data;
}


export const getPatientByName = async(fullName)=>{
    const response = await patientApi.get("/api/patient-management/get?fullName=" + fullName);
    return response.data;
}

export const searchPatientsByName = async(name)=>{
    const response = await patientApi.get("/api/patient-management/search?name="+name);
    return response.data;
}