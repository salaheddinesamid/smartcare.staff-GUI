export const RoomStatusMapper = (status)=>{
    switch(status){
        case "AVAILABLE":
            return {label : "Available", bgColor : "success"}
        case "OCCUPIED":
            return {label : "Occupied", bgColor : "bg-warning"}
    }
}