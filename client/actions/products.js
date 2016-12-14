export const STARTING_REQUEST = 'STARTING_REQUEST';
export const FINISH_REQUEST = 'FINISH_REQUEST';

export const requestProducts = () => ({type: STARTING_REQUEST});
export const receiveProducts = (products) => ({type: FINISH_REQUEST, products, fetching: false});
