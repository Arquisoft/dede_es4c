import { Miembro } from '../interface/interfaces';
import { User } from '../shared/shareddtypes';
import { Pincho } from '../shared/shareddtypes';
import { Order } from '../shared/shareddtypes';

const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

export async function addUser(user: User): Promise<boolean> {
  let response = await fetch(apiEndPoint + '/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'name': user.name, 'email': user.email })
  });
  if (response.status === 200)
    return true;
  else
    return false;
}

export async function getUsers(): Promise<User[]> {
  let response = await fetch(apiEndPoint + '/users/list');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}

export async function getPinchos(): Promise<Pincho[]> {
  let response = await fetch(apiEndPoint + '/pinchos');
  return response.json()
}

export async function getPinchoById(id: string): Promise<Pincho[]> {
  let response = await fetch(apiEndPoint + '/pinchos/search/' + id);
  return response.json()
}

export async function getPinchoComida(): Promise<Pincho[]> {
  let response = await fetch(apiEndPoint + '/pinchos/comida');
  return response.json()
}

export async function getPinchoBebida(): Promise<Pincho[]> {
  let response = await fetch(apiEndPoint + '/pinchos/bebida');
  return response.json()
}

export async function getPostre(): Promise<Pincho[]> {
  let response = await fetch(apiEndPoint + '/pinchos/postre');
  return response.json()
}

export async function getPinchoVegetariano(): Promise<Pincho[]> {
  let response = await fetch(apiEndPoint + '/pinchos/vegetariano');
  return response.json()
}

export async function getPinchoNoVegetariano(): Promise<Pincho[]> {
  let response = await fetch(apiEndPoint + '/pinchos/no_vegetariano');
  return response.json()
}

export async function getOrders(): Promise<Order[]> {
  let response = await fetch(apiEndPoint + '/orders');
  return response.json()
}

export async function getOrderById(id: string): Promise<Order[]> {
  let response = await fetch(apiEndPoint + '/orders/search/' + id);
  return response.json()
}

export async function getOrderByClientId(id: string): Promise<Order[]> {
  let response = await fetch(apiEndPoint + '/orders/client/' + id);
  return response.json()
}

export async function addOrder(order: Order): Promise<boolean> {
  let response = await fetch(apiEndPoint + '/orders/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'cliente': order._cliente_id, 'direccion': order._direccion, 'precio': order._precio, 'productos': order._productos })
  });

  if (response.status === 200) {
    return true;
 }
  return false;
}
export async function getMiembros(): Promise<Miembro[]> {
  let response = await fetch(apiEndPoint + '/miembros');
  return response.json()
}
