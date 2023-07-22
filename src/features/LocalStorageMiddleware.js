import {setItem} from "./LocalStorageSlice/LocalStorageSlice";

const localStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === 'localStorage/setItem' || action.type === 'localStorage/getItem') {
    return next(action);
  }

  const result = next(action);

  if (action.meta?.localStorageKey) {
    const state = store.getState();
    const value = state[action.meta.localStorageKey];

    if (action.type === 'localStorage/setItem') {
      store.dispatch(setItem({ key: action.meta.localStorageKey, value }));
    }
  }

  return result;
};

export default localStorageMiddleware;
