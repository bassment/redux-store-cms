import shared from 'styles/shared.scss';
import styles from './counter.scss';

import {counterButtons} from 'staticData/data';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

export default class Counter extends React.Component {
    render() {
        const {increment, decrement, counter} = this.props;

        // VIEWS

        const viewCounterButtons = (() => {
            return counterButtons.map((button, key) => {
                const {name} = button;
                const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

                return <button key={key} className={styles['button']} onClick={this.props[name]}>
                    {capitalized}
                </button>;
            });
        })();

        // RENDER VIEW

        return (
            <div>
                <Helmet title="Count"/>
                <section className={shared['section']}>
                    <h1>Counter: {counter}</h1>
                    <p>Click the button to increment the counter</p>
                    <div>
                        {viewCounterButtons}
                    </div>
                    <Link to="/">
                        <button className={styles['button-home']}>Go Home</button>
                    </Link>
                    <Link to="/login">
                        <button className={styles['button']}>Logout</button>
                    </Link>
                </section>
            </div>
        );
    }
}
