import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Main } from 'pages';
import Menu from 'components/Menu';

class App extends Component {
    render() {
        return(
            <div>
                <Menu />
                <Route exact path="/" component={Home} />
                <Switch>
                    <Route path="/main/:name" component={Main} />
                    <Route path="/main" component={Main} />
                </Switch>
            </div>
        );
    }
}

export default App;