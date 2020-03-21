import React, {Component} from 'react';

class FollowList extends Component{
    state = {
        status: null,
        list: [],
    }
    constructor(props){
        super(props);

        const axios = require('axios');
        axios.get('http://olloc.kr3.kr:8000/follow/?user_id=44')
            .then((response) =>{
                console.log(response);
                for(let i = 0; i < response.data.following_list.length; i++)
                    this.setState({list: this.state.list.concat(response.data.following_list[i].username)})
            })
    }
    render(){
        const list = this.state.list.map(
            (name) => <li>{name}</li>
        )
        return(
            <div id="FollowList">
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}

export default FollowList