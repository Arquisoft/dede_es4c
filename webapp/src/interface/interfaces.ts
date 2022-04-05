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