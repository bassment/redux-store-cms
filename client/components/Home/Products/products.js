import shared from 'styles/shared.scss';
import icons from 'styles/icons.scss';
import styles from './products.scss';

// import {menuItems} from 'staticData/data';

import React from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

export default class Products extends React.Component {
    componentDidMount() {
        this.props.getProducts(
            `{
                product(id: "8d0c95dc-e059-4d02-a022-6f5cbbf1af67") {
                    title,
                    price,
                    image
                }
            }`
        );
    }

    render() {
        const {products, getProducts} = this.props;
        const fetching = products.get('fetching');
        const product = products.get('data').toObject();
        const {title, price, image} = product;

        // VIEWS

        const viewProducts = (() => {
            return (
                <div>
                    <div className="thumbnail">
                        <div className="imageWrapper">
                            <img
                                src="img/home/featured-collection/featured-collection-01.jpg"
                                alt="feature-collection-image" />
                            <div className="masking">
                                <a href="product-grid-left-sidebar.html" className="btn viewBtn">View Products</a>
                            </div>
                        </div>
                        <div className="caption">
                            <h4>{title}</h4>
                        </div>
                    </div>
                </div>
            );
        })();

        // RENDER VIEW

        return (
            <div className={styles['slider']}>
                {fetching ? <p>Loading...</p> : viewProducts}
            </div>
        );
    }
}
