import {combineReducers} from 'redux-immutable';
import counter from './counter';
import login from './login';

const rootReducer = combineReducers({counter, login});

export default rootReducer;
