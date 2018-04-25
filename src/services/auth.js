import request from '../utils/request';

export async function login(params) {
  return request(`/api/auth`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
