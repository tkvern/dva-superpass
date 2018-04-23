export default {
  namespace: 'menus',

  state: {
    selectedTab: 'exchange',
    hidden: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen((location) => {
        const match = location.pathname.match(/kline|exchange|user/);
        if (match) {
          dispatch({
            type: 'selectedTabSwitch',
            payload: {
              selectedTab: match[0],
            }
          })
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    hiddenClick(state, action) {
      return { ...state, ...action.payload }
    },
    selectedTabSwitch(state, action) {
      return { ...state, ...action.payload }
    }
  },

};
