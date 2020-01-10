
export interface Vehicle {
    id: number;
    model: KeyValuePair;
    make: KeyValuePair;
    isRegistered: boolean;
    feature:KeyValuePair[];
    contact:Contact;
    lasUpdate:Date;
}

export interface SaveVehicle {
    id: number;
    modelId: number;
    makeId: number;
    isRegistered: boolean;
    feature:number[];
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