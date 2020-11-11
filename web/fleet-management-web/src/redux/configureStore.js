import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import { verifyAuth } from "./actions/authorization_actions";
import rootReducer from "./reducers/index";

function configureStore(persistedState) {
  /* eslint-disable no-underscore-dangle */
  // const store = createStore(rootReducer, persistedState, /* preloadedState, */
  //     compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // ));
  /* eslint-enable */

  const store = createStore(
    rootReducer,
    persistedState,
    compose(applyMiddleware(thunkMiddleware))
  );

  store.dispatch(verifyAuth());
  return store;
}

export default configureStore;
