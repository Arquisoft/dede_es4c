class Producto{
    nombre: string;
    precio: number;
    cantidad: number;

    constructor(nombre:string, precio:number, cantidad:number){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

export default Producto;