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

export async function destory(params) {
  return request(`${config.host}/api/message_subscriptions/${params.id}`, {
    method: 'DELETE',
  });
}

export async function update(params) {
  return request(`${config.host}/api/message_subscriptions/${params.id}`, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
}

export async function editOpen(params) {
  return request(`${config.host}/api/message_subscriptions/${params.id}/edit_open`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  });
}

export async function currencyDetail() {
  return request(`${config.host}/api/currency_details`, {
    method: 'GET',
  })
}
