import shared from 'styles/shared.scss';
import icons from 'styles/icons.scss';
import styles from './slider.scss';

// import {menuItems} from 'staticData/data';

import React from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

export default class Slider extends React.Component {
    render() {
        return (
            <div className={styles['slider']}>
                <img src="images/shoe1.png" />
            </div>
        );
    }
}
