import {createStore,compose,combineReducers,applyMiddleware} from 'redux';

import ThunkMiddleware from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { messengerReducer } from './reducers/MessengerReducer';

const rootReducer = combineReducers({
    auth : authReducer,
    messenger:messengerReducer,
})

const middlewares = [ThunkMiddleware]

const store = createStore(rootReducer,compose(applyMiddleware(...middlewares),
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;