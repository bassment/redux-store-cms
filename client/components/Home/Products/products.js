import shared from 'styles/shared.scss';
import icons from 'styles/icons.scss';
import styles from './products.scss';

// import {menuItems} from 'staticData/data';

import React from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

export default class Products extends React.Component {
    componentWillMount() {
        this.props.getProducts(
            `{
                goldberg(id: 2) {
                    id,
                    character,
                    actor
                }
            }`
        );
    }

    render() {
        const {products, getProducts} = this.props;
        const fetching = String(products.get('fetching'));
        const goldberg = products.get('data').toObject();
        const {character, actor, id} = goldberg;

        // VIEWS

        const viewProducts = (() => {
            return (
                <div>
                    <p>{character}</p>
                    <p>{actor}</p>
                    <p>{id}</p>
                </div>
            );
        })();

        // RENDER VIEW

        return (
            <div className={styles['slider']}>
                {viewProducts}
            </div>
        );
    }
}
