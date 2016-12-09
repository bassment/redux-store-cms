import * as types from 'actions/login';

export default function login(state = {
    user: null || localStorage.getItem('user'),
    error: null
}, action) {
    switch (action.type) {
        case types.SIGN_IN:
            return {user: action.user, error: action.error};
        case types.SIGN_OUT:
            return {user: null, error: null};
        default:
            return state;
    }
}
