import React, {PureComponent} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom'
import Page from './Page';

export default class App extends PureComponent {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/:timedate" component={Page} />
                    <Route path="/" component={Page} />
                </Switch>
            </Router>
        );
    }
};
