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
    user: User;
}

export interface User {
    username: string;
    email: string;
}