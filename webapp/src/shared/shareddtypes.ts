export type User = {
  name: string;
  email: string;
}
export type Pincho = {
  _id: string;
  _precio: string;
  _tipo: string;
  _descripcion: string;
  _vegetariano: boolean;
  _ingredientes: Array<String>;
};
export type Order = {
  _id: string,
  _cliente_id: string;
  _direccion: string;
  _precio: Record<string, string>;
  _productos: Record<string, string>;
}

export type CartItem = {
  id: string;
  name: string;
  price: string;
}

export type Member = {
  id:string;
  uo:string;
  name:string;
}
