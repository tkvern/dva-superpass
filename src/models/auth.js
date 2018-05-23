import { parse } from 'qs';
import { Toast } from 'antd-mobile';
import { login } from '../services/auth';
import { getLocalStorage, setLocalStorage, getCookie, setCookie } from '../utils/helper';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'auth',
  state: {
    user: {},
    isLogined: false,
    loginFail: false,
    currentMenu: [],
  },
  reducers: {
    checklogin(state, action) {
      return { ...state, isLogin: action.payload.isLogin };
    },
    loginSuccess(state, action) {
      return { ...state, ...action.payload, isLogined: true };
    },
    loginFail(state, action) {
      return { ...state, loginFail: action.payload.loginFail };
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
      if (data && data.err_code === 0) {
        data.user.wechat_info = JSON.parse(data.user.wechat_info);
        setCookie('access_token', data.access_token, 720);
        setLocalStorage('user', data.user);
        yield put({
          type: 'loginSuccess',
          payload: {
            user: data.user,
          }
        });
        yield put({
          type: 'checklogin',
          payload: {
            isLogined: true,
          }
        });
        yield put(routerRedux.push('/app/user'));
        Toast.success("登录成功！", 2);
      } else {
        Toast.fail(data.err_msg, 1.5);
        yield put({
          type: 'loginFail',
          payload: {
            loginFail: true,
          }
        });
      }
    },
    * loginhook({ payload }, { select, call, put }) {
      const access_token = getCookie('access_token');
      const user = getLocalStorage('user');
      if (access_token && user) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: user,
          }
        });
        yield put({
          type: 'exchange/checkCache',
        });
      } else {
        localStorage.clear();
        yield put({
          type: 'checklogin',
          payload: {
            isLogined: false,
          }
        });
        yield put(routerRedux.push('/login'));
      }
    },
    * redirect({ payload }, { select, call, put }) {
      const access_token = getCookie('access_token');
      const user = getLocalStorage('user');
      if (access_token && user) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: user,
          }
        });
        yield put(routerRedux.push('/app/user'));
        Toast.success("已登陆！", 2);
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.includes('app')) {
          dispatch({
            type: 'loginhook',
          });
        } else {
          dispatch({
            type: 'redirect',
          });
        }
      });
    },
  },
}
