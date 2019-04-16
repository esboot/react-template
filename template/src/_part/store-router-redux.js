import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './model/reducer';

export const history = createBrowserHistory();

export function configureStore(initialState = {}) {
  const store = createStore(
    createRootReducer(history),
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
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
}
