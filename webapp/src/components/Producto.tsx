class Producto{
    nombre: string;
    precio: number;
    cantidad: number;

    constructor(nombre:string, precio:number, cantidad:number){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    getPrecioSinIva(){
        return this.cantidad*(this.precio*100/121);
    }
}

export default Producto;