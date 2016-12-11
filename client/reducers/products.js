import * as types from 'actions/products';
import Immutable from 'immutable';

const productsState = Immutable.Map({
    fetching: false,
    data: Immutable.Map({})
});

export default function products(state = productsState, action) {
    switch (action.type) {
        case types.STARTING_REQUEST:
            return state.set('fetching', true);
        case types.FINISH_REQUEST:
            return state
                .set('fetching', false)
                .set('data', Immutable.Map(action.products.data.goldberg));
        default:
            return state;
    }
}
