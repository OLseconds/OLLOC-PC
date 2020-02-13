import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Main, Post } from 'pages';
import Menu from 'components/Menu';
import {MyPost} from "../pages";

class App extends Component {
    render() {
        return(
            <div>
                <Menu />
                <Route exact path="/" component={Home} />
                <Switch>
                    <Route path="/main/:name" component={Main} />
                    <Route path="/main" component={Main} />
                    <Route path="/post" component={Post} />
                    <Route path="/mypost" component={MyPost} />
                </Switch>
            </div>
        );
    }
}

export default App;