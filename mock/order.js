'use strict';

const qs = require('qs');
const mockjs = require('mockjs');
const Random = mockjs.Random;
Random.extend({
  odds: function (date) {
    const constellations = [10, 20, 50];
    return this.pick(constellations)
  }
})
Random.extend({
  magnitude: function (date) {
    const constellations = [1, 2, 5, 4, 10, 24];
    return this.pick(constellations)
  }
})
Random.extend({
  direction: function (date) {
    const constellations = ['up', 'down'];
    return this.pick(constellations)
  }
})
Random.extend({
  status: function (date) {
    const constellations = [1, 2];
    return this.pick(constellations)
  }
})
let orderCollection = {};
let userCollection = {};

if (global.userCollection) {
  userCollection = global.userCollection
}

if (!global.orderCollection) {
  let orders = mockjs.mock({
    'row|10': [{
      'id|+1': 1,
      'user_id': () => {
        return Random.natural(1, 100);
      },
      'created_at': () => {
        return Random.now('yyyy-MM-dd HH:mm:ss');
      },
      'updated_at': () => {
        return Random.now('yyyy-MM-dd HH:mm:ss');
      },
      'price': () => {
        return Random.natural(100, 10000).toFixed(2);
      },
      'odds': () => {
        return Random.odds();
      },
      'magnitude': () => {
        return Random.magnitude();
      },
      'direction': () => {
        return Random.direction();
      },
      'status': () => {
        return Random.status();
      },
      'ticker_price': () => {
        return Random.float(9200, 9500, 2, 2);
      },
      'rate': 6.3057,
    }],
    page: {
      total: 2000,
      current: 1,
    },
  })
  orderCollection = orders;
  global.orderCollection = orderCollection;
} else {
  orderCollection = global.orderCollection
}

module.exports = {
  'GET /api/orders'(req, res) {
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 10;
    const currentPage = page.page || 1;

    let data;
    let newPage;

    let newData = orderCollection.row;
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
      data = orderCollection.row.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      orderCollection.page.current = currentPage * 1;

      newPage = {
        current: orderCollection.page.current,
        total: orderCollection.page.total,
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
  'POST /api/orders/current'(req, res) {
    const {
      user_id,
      status
    } = qs.parse(req.body);
    if (!user_id || !status) {
      return res.json({
        success: false,
        err_msg: '提交系统不正确'
      })
    };
    let orders = orderCollection.row.filter((item) => {
      return item.user_id === user_id && item.status === status;
    });
    orders.sort(function (a, b) {
      return Date.parse(b.updated_at) - Date.parse(a.updated_at);
    });
    if (orders.length > 0) {
      return res.json({
        success: true,
        data: orders,
      });
    } else {
      return res.json({
        success: false,
        err_msg: '没有订单'
      })
    }

  },
  'POST /api/orders/create'(req, res) {
    const {
      price,
      odds,
      magnitude,
      direction,
      ticker_price,
      user_id,
      rate
    } = qs.parse(req.body);
    if (!price || !odds || !magnitude || !direction || !ticker_price || !user_id || !rate) {
      return res.json({
        success: false,
        err_msg: '提交参数不正确'
      })
    };
    let user = userCollection.row.filter((item) => {
      return item.id === user_id;
    })
    if (user[0].balance - price < 0) {
      return res.json({
        success: false,
        err_msg: '余额不足'
      })
    }
    user[0].balance = user[0].balance - price;
    let order = {
      price: price,
      odds: odds,
      magnitude: magnitude,
      direction: direction,
      ticker_price: ticker_price,
      user_id: user_id,
      id: orderCollection.row.length + 1,
      created_at: new Date(),
      updated_at: new Date(),
      rate: rate,
      status: 1
    }
    orderCollection.row.push(order);
    setTimeout(() => {
      res.json({
        success: true,
        data: order,
      });
    }, 200);
  }
}
