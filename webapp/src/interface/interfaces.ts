export interface Producto {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
}

export interface CartState {
    numeroElems: number;
    total: number;
    productos: Producto[];
}

export interface UserState{
    isAuthenticated: boolean;
    user: BDUser;
    info: InfoPod
}

export interface BDUser {
    __v: number,
    _email: string,
    _id: string,
    _password: string,
    _username: string
}

export interface Token {
    iat: number,
    user: BDUser
}

export interface InfoPod {
    isLoggedIn: boolean,
    webId: string,
    sessionId: string,
    expirationDate: number,
}

export interface UserData {
    _id: string,
    email: string,
    name: string,
    surname: string,
    phone: number,
    county: string,
    prvince: string,
    city: string,
    zip_code: number,
    address: string,
    _v: number
}