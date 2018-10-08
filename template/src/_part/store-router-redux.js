import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from './model/reducer';

export const history = createBrowserHistory();

export function configureStore(initialState = {}) {
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        // ... other middlewares ...
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  if (module.hot) {
    module.hot.accept('./model/reducer', () => {
      store.replaceReducer(connectRouter(history)(rootReducer));
    });
  }

  return store;
}
