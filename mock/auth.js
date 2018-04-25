'use strict';

const qs = require('qs');
const mockjs = require('mockjs');
const Random = mockjs.Random;

let userCollection = {};

if (!global.userCollection) {
  let data = mockjs.mock({
    'row|98': [{
      'id|+1': 1,
      'uuid': () => {
        return Random.guid()
      },
      'name': () => {
        return Random.first();
      },
      'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
      'avatar': () => {
        return Random.image('125x125');
      },
      'status|1-2': 1,
      'email': () => {
        return Random.email('visiondk.com');
      },
      'created_at': () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss');
      },
      'updated_at': () => {
        return Random.now('yyyy-MM-dd HH:mm:ss');
      },
      'password': () => {
        return '123123';
      },
      'balance': () => {
        return Random.float(0, 99999, 2, 2);
      }
    }]
  });

  const data2 = mockjs.mock({
    'row|1': [{
      'id|+1': 99,
      'uuid': () => {
        return Random.guid()
      },
      'name': () => {
        return Random.first();
      },
      'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
      'avatar': () => {
        return Random.image('125x125');
      },
      'status|1-2': 1,
      'email': 'tkvern@qq.com',
      'created_at': () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss');
      },
      'updated_at': () => {
        return Random.now('yyyy-MM-dd HH:mm:ss');
      },
      'password': () => {
        return '123123';
      },
      'balance': () => {
        return Random.float(0, 99999, 2, 2);
      }
    }]
  });
  const data3 = mockjs.mock({
    'row|1': [{
      'id|+1': 100,
      'uuid': () => {
        return Random.guid()
      },
      'name': () => {
        return Random.first();
      },
      'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
      'avatar': () => {
        return Random.image('125x125');
      },
      'status|1-2': 1,
      'email': 'zshuang@qq.com',
      'created_at': () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss');
      },
      'updated_at': () => {
        return Random.now('yyyy-MM-dd HH:mm:ss');
      },
      'password': () => {
        return '123123';
      },
      'balance': () => {
        return Random.float(0, 99999, 2, 2);
      }
    }]
  });
  data.row.push(data2.row);
  data.row.push(data3.row);
  userCollection = data;
  global.userCollection = userCollection;
} else {
  userCollection = global.userCollection;
}

module.exports = {
  'POST /api/auth'(req, res) {
    setTimeout(() => {
      clearTimeout(this);
      const { email, password } = qs.parse(req.body);
      const user = userCollection.row.filter((item) => {
        return item.email === email && item.password === password;
      });
      if (user.length > 0) {
        console.log(new Date(Date.now() + 86400000));
        res.json({
          success: true,
          data: user[0],
          token: Random.string('lower', 10)
        });
      } else {
        res.json({
          success: false,
          err_msg: '账户或密码不正确'
        })
      }
    }, 100);
  }
}