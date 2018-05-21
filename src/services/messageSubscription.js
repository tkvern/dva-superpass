import request from '../utils/request';
import config from '../config';

export async function query() {
  return request(`${config.host}/api/message_subscriptions`, {
    method: 'GET',
  });
}

export async function store(params) {
  return request(`${config.host}/api/message_subscriptions`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
