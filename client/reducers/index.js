import {combineReducers} from 'redux-immutable';
import counter from './counter';
import login from './login';
import products from './products';

const rootReducer = combineReducers({
    counter,
    login,
    products
});

export default rootReducer;
