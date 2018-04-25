// import { parse } from 'qs';
import { rate } from '../services/exchange';
import { getLocalStorage, setLocalStorage } from '../utils/helper';
export default {
  namespace: 'exchange',
  state: {
    ticker_price: 0,
    ticker_percent: 0.00,
    ticker_change: 0,
    ticker_direction: '',
    cnyusd: 0,
  },
  reducers: {
    updateTicker(state, action) {
      return { ...state, ...action.payload };
    },
    updateCnyusd(state, action) {
      return { ...state, ...action.payload };
    }
  },
  effects: {
    * checkCache({ payload }, { select, call, put }) {
      const ticker = getLocalStorage('ticker');
      const rates = getLocalStorage('rates');
      if (ticker) {
        yield put({
          type: 'updateTicker',
          payload: {
            ticker_price: ticker.ticker_price,
            ticker_percent: ticker.ticker_percent,
            ticker_change: ticker.ticker_change,
            ticker_direction: ticker.ticker_direction
          }
        })
      }
      if (rates) {
        yield put({
          type: 'updateTicker',
          payload: {
            cnyusd: rates['CNY'],
          }
        })
      } else {
        yield put({
          type: 'rate'
        })
      }
    },
    * rate({ payload }, { call, put }) {
      const { data } = yield call(rate);
      if (data && data.rates) {
        setLocalStorage('rates', data.rates);
        yield put({
          type: 'updateCnyusd',
          payload: {
            cnyusd: data.rates['CNY'],
          }
        })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.includes('exchange')) {
          dispatch({
            type: 'checkCache',
          });
        }
      });
    },
  },
}
