import { applyMiddleware, createStore, Middleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import appReducer from './ducks';

const middlewares: Middleware[] = [thunk as ThunkMiddleware];

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;