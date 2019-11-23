import { createStore } from 'redux';
import { reducer } from './reducer';
import { initialState } from './state';
import { LOCAL_STORE_STATE } from '../constants';

const persistedState = localStorage.getItem(LOCAL_STORE_STATE);

export const store = createStore(
  reducer,
  persistedState ? JSON.parse(persistedState) : initialState
);

store.subscribe(() =>
  localStorage.setItem(LOCAL_STORE_STATE, JSON.stringify(store.getState()))
);
