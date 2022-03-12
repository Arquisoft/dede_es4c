class Producto{
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;

    constructor(id:string, nombre:string, precio:number, cantidad:number){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

export default Producto;