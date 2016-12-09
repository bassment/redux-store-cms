import shared from 'styles/shared.scss';
import icons from 'styles/icons.scss';
import styles from './home.scss';

import {menuItems} from 'staticData/data';

import React from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

export default class Home extends React.Component {
    render() {

        // VIEWS

        const viewMenu = (() => {
            return menuItems.map((item, key) => <li key={key}><Link to={item.link}>{item.name}</Link></li>);
        })();

        // RENDER VIEWS

        return (
            <div>
                <Helmet title="Shop"/>
                <div className={styles['subnav']}>
                    <div className={shared['container']}>
                        <div className={styles['subnav-column']}>
                            <ul className={styles['subnav-menu']}>
                                <li>
                                    <span>
                                        <a href="#">Log in</a>
                                        <small>or</small>
                                        <a href="#">Create an account</a>
                                    </span>
                                </li>
                                <li>
                                    <a> <i className={icons['icon-search']}></i> </a>
                                </li>
                                <li>
                                    <a> <i className={icons['icon-shop']}></i>$0</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles['header']}>
                    <div className={shared['container']}>
                        <div className={styles['brand']}>
                            <a href="#" className={styles['logo']}>
                                <img src="images/logo.png" alt="" />
                            </a>
                        </div>
                        <div className={styles['nav']}>
                            <ul className={styles['nav-list']}>
                                {viewMenu}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles['slider']}>
                    <img src="images/shoe1.png" />
                </div>
            </div>
        );
    }
}
