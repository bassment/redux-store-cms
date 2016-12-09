import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'containers/App';
import Home from 'containers/Home';
import Counter from 'containers/Counter';
import Login from 'containers/Login';

function requireAuth(nextState, replace) {
    if (!localStorage.getItem('user')) {
        replace('/login');
    }
}

const routes = (
    <Route component={App}>
        <Route path="/">
            <IndexRoute component={Home}/>
        </Route>
    </Route>
);

export default routes;
