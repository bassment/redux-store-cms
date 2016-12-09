import 'styles/globals.scss';

import React, {PropTypes} from 'react';
import DevTools from './DevTools';

export default class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
                {process.env.NODE_ENV !== 'production' ? <DevTools/> : null}
            </div>
        );
    }
}
