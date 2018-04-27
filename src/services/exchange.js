import request from '../utils/request';

export async function rate() {
  return request('http://api.fixer.io/latest?base=USD');
}

export async function currentOrders(params) {
  return request(`/api/orders/current`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function create(params) {
  return request(`/api/orders/create`, {
    method: 'POST',
    body: JSON.stringify(params),
  })
}
