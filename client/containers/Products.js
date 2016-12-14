import Firebase from 'firebase';
import * as API from 'helpers/restAPI';

import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import Products from 'components/Home/Products/products';
import {requestProducts, receiveProducts} from 'actions/products';

const mapStateToProps = (state) => {
    return {
        products: state.get('products')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: (products) => {
            dispatch(requestProducts());
            const response =
                API.requestProducts(products)
                    .then(result => dispatch(receiveProducts(result.data.product)))
                    .catch(console.error);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
