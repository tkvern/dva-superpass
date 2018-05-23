// Operation LocalStorage
export function setLocalStorage(key, vaule) {
  return localStorage.setItem(key, JSON.stringify(vaule));
}

export function getLocalStorage(key) {
  const value = JSON.parse(localStorage.getItem(key));
  return value;
}

// Operation Cookie
export function setCookie(c_name, value, expireMinute) {
  var exdate = new Date()
  exdate.setDate(exdate.getTime() + expireMinute * 60 * 1000);
  document.cookie = c_name + "=" + escape(value) +
    ((expireMinute == null) ? "" : ";expires=" + exdate.toGMTString())
}

export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=")
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(";", c_start)
      if (c_end === -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}

export function delCookie(name) {
  setCookie(name, "", -1);
}

export function getScoresType(type) {
  let data = {};
  switch (type) {
    case '1':
      data['text'] = '充值';
      data['direction'] = true;
      break;
    case '2':
      data['text'] = '赠送';
      data['direction'] = true;
      break;
    case '3':
      data['text'] = '盈利';
      data['direction'] = true;
      break;
    case '4':
      data['text'] = '下注';
      data['direction'] = false;
      break;
    case '5':
      data['text'] = '兑换';
      data['direction'] = false;
      break;
    case '6':
      data['text'] = '签到';
      data['direction'] = true;
      break;
    default:
      data['text'] = 'unknown';
      data['direction'] = undefined;
  }
  return data;
}
