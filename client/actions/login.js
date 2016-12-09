export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const signin = (user, error) => {
    return {type: SIGN_IN, user, error};
};

export const signout = (user) => {
    return {type: SIGN_OUT, user};
};
