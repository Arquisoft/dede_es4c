class Producto{
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    description:string;
    vegetariano:boolean;
    ingredientes: Array<String>;

    constructor(id:string, nombre:string, precio:number, cantidad:number, description:string, vegetariano:boolean, ingredientes: Array<String>){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.description = description;
        this.vegetariano = vegetariano;
        this.ingredientes = ingredientes;
    }

}

export default Producto;