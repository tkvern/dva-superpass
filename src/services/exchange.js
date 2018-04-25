import request from '../utils/request';

export async function rate() {
  return request('http://api.fixer.io/latest?base=USD');
}
