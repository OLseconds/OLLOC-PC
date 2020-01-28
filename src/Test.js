import React, {Component} from 'react';

class Test extends Component{
    handleClick(){
        console.log(this)
    }
    render(){
        return(
            <button type = "button" onClick={this.handleClick.bind(this)}>
                test
            </button>
        );
    }
}
export default Test