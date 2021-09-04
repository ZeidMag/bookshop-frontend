import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import authorsReducer from './reducers/authors';
import booksReducer from './reducers/books';
import rentsReducer from './reducers/rents';
import userReducer from './reducers/user';
import alertReducer from './reducers/alert';

const rootReducer = combineReducers({
  authors: authorsReducer,
  books: booksReducer,
  rents: rentsReducer,
  user: userReducer,
  alert: alertReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const MainProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default MainProvider;
