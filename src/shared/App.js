import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Main, Post } from 'pages';
import Header from 'components/Header';
import {MyPost} from "../pages"
import ProfileSetting from "../components/MyPost/ProfileSetting";

class App extends Component {
    render(){
        return(
            <div>
                <Header />
                <div style={{"paddingTop": "75px"}}></div>
                <Route exact path="/" component={Home} />
                <Switch>
                    <Route path="/main/:name" component={Main} />
                    <Route path="/main" component={Main} />
                    <Route path="/post" component={Post} />
                    <Route path="/post:id" component={Post} />
                    <Route path="/mypost" component={MyPost} />
                    <Route path="/mypost:id" component={MyPost} />
                    <Route path="/profile" component={ProfileSetting} />
                    <Route path="/profile:id" component={ProfileSetting} />

                </Switch>
            </div>
        );
    }
}

export default App;