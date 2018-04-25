import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { login } from '../services/auth';
import { setLocalStorage, getCookie, setCookie } from '../utils/helper';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'auth',
  state: {
    user: {},
    isLogined: false,
    loginfail: false,
    currentMenu: [],
  },
  reducers: {
    checklogin(state, action) {
      return { ...state, isLogin: action.payload.isLogin };
    },
    loginfail(state, action) {
      return { ...state, loginfail: action.payload.loginfail };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
  },
  effects: {
    * login({ payload }, { call, put }) {
      const { data } = yield call(login, parse(payload));
      if (data && data.success) {
        setCookie('token', data.token, 1);
        setLocalStorage('user', data.data);
        Toast.success("登录成功！", 2);
        yield put({
          type: 'checklogin',
          payload: {
            isLogined: true,
          }
        });
        yield put(routerRedux.push('/app/user'))
      } else {
        Toast.fail(data.err_msg, 1);
        yield put({
          type: 'loginfail',
          payload: {
            loginfail: true,
          }
        });
      }
    },
    * loginhook({ payload }, { select, call, put }) {
      const token = getCookie('token');
      if (!token) {
        yield put(routerRedux.push('/login'));
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.includes('app')) {
          dispatch({
            type: 'loginhook',
          });
        }
      });
    },
  },
}
