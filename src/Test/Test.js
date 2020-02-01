import React, { Component } from 'react';
import { PostContainer } from './containers';
import { Header } from "./components";

class Test extends Component{
    render(){
        return(
          <div>
                <Header />
                <PostContainer />
          </div>
        );
    }
}

export default Test;