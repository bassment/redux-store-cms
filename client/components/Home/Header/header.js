import shared from 'styles/shared.scss';
import icons from 'styles/icons.scss';
import styles from './header.scss';

import {menuItems, socialIcons} from 'staticData/data';
import {join} from 'helpers/viewHelper';

import React from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

export default class Header extends React.Component {
    render() {

        // VIEWS

        const viewMenu = (() => {
            return menuItems.map((item, key) => <li key={key}> <Link to={item.link}>{item.name}</Link> </li>);
        })();

        const viewSocial = (() => {
            return socialIcons.map((icon, key) => {
                const {name, link} = icon;

                return <li key={key}>
                    <a href={link}> <i className={icons['icon-' + name]}></i> </a>
                </li>;
            });
        })();

        const viewSubnav = (() => {
            return (
                <div className={styles['subnav']}>
                    <div className={shared['clearfix']}>
                        <div className={join(shared['col-6'], shared['hide-on-small'])}>
                            <ul className={styles['subnav-social']}>
                                {viewSocial}
                            </ul>
                        </div>
                        <div className={join(shared['col-6'], shared['col-right'])}>
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
            );
        })();

        const viewHeader = (() => {
            return (
                <div className={styles['header']}>
                    <div className={shared['clearfix']}>
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
            );
        })();

        // RENDER VIEWS

        return (
            <div>
                {viewSubnav}
                {viewHeader}
            </div>
        );
    }
}
