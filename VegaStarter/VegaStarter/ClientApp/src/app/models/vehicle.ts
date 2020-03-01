
export interface Vehicle {
    id: number;
    model: KeyValuePair;
    make: KeyValuePair;
    isRegistered: boolean;
    features:KeyValuePair[];
    contact:Contact;
    lasUpdate:Date;
}

export interface SaveVehicle {
    id: number;
    modelId: number;
    makeId: number;
    isRegistered: boolean;
    features:number[];
    contact:Contact;
}

export interface KeyValuePair {
    id: number;
    name: string
}

export interface Contact {
    name: string;
    phone: string;
    email: string;
}


// export interface QueryModel{
//      makeId?:number
//     modelId?:number
//     sortBy?:boolean
//     isSortAscending?:boolean
//     page?:number
//     pageSize:number
// }