import * as types from 'actions/products';
import Immutable from 'immutable';

const productsState = Immutable.Map({
    fetching: false,
    data: Immutable.Map({})
});

export default function products(state = productsState, action) {
    switch (action.type) {
        case types.STARTING_REQUEST:
            return state.set('fetching', false);
        case types.FINISH_REQUEST:
            return state
                .set('fetching', action.fetching)
                .set('data', Immutable.Map(action.products));
        default:
            return state;
    }
}
