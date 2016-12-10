import shared from 'styles/shared.scss';
import icons from 'styles/icons.scss';
import styles from './home.scss';

import {menuItems} from 'staticData/data';

import React from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

import Header from './Header/header';
import Slider from './Slider/slider';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Helmet title="Shop"/>
                <Header />
                <Slider />
            </div>
        );
    }
}
