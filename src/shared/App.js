import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About } from 'pages';
import Login from '../components/Login'
import Menu from '../components/Menu';

class App extends Component {
    render() {
        return(
            <div>
                <Menu />
                <Route exact path="/" component={Home} />
                <Switch>
                    <Route path="/about/:name" component={About} />
                    <Route path="/about" component={About} />
                    <Route path="/login" component={Login} />
                </Switch>
            </div>
        );
    }
}

export default App;