'use strict';

const qs = require('qs');
const mockjs = require('mockjs');
const Random = mockjs.Random;

let userCollection = {};

if (!global.userCollection) {
  let users = mockjs.mock({
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
        return Random.image('125x125', Random.color(), '#FFFFFF', 'jpg', Random.string('upper', 1));
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
    }],
    page: {
      total: 100,
      current: 1,
    },
  });

  const user2 = mockjs.mock({
    'row|1': [{
      'id|+1': 99,
      'uuid': () => {
        return Random.guid()
      },
      'name': () => {
        return 'Vern';
      },
      'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
      'avatar': () => {
        return Random.image('125x125', Random.color(), '#FFFFFF', 'jpg', 'T');
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
  const user3 = mockjs.mock({
    'row|1': [{
      'id|+1': 100,
      'uuid': () => {
        return Random.guid()
      },
      'name': () => {
        return 'Zshuang';
      },
      'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
      'avatar': () => {
        return Random.image('125x125', Random.color(), '#FFFFFF', 'jpg', 'Z');
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
  users.row.push(user2.row);
  users.row.push(user3.row);
  userCollection = users;
  global.userCollection = userCollection;
} else {
  userCollection = global.userCollection;
}

module.exports = {
  'GET /api/users'(req, res) {
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 10;
    const currentPage = page.page || 1;

    let data;
    let newPage;

    let newData = userCollection.row;
    if (page.field) {
      const d = newData.filter((item) => {
        return item[page.filed].indexOf(page.keyword) > -1;
      });

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

      newPage = {
        current: currentPage * 1,
        total: d.length,
      };
    } else {
      data = userCollection.row.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      userCollection.page.current = currentPage * 1;

      newPage = {
        current: userCollection.page.current,
        total: userCollection.page.total,
      }
    }
    setTimeout(() => {
      res.json({
        success: true,
        data: data,
        page: newPage
      });
    }, 200);
  },
  'POST /api/auth'(req, res) {
    const { email, password } = qs.parse(req.body);
    const user = userCollection.row.filter((item) => {
      return item.email === email && item.password === password;
    });
    setTimeout(() => {
      clearTimeout(this);
      if (user.length > 0) {
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
