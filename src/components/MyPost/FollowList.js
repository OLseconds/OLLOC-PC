import React, {Component} from 'react';
import '../../style/FollowList.scss';

class FollowList extends Component{
    state = {
        status: null,
        list: [],
    }
    constructor(props){
        super(props);

        const axios = require('axios');
        if(this.props.stat === 'follow'){
            axios.get('http://olloc.kr3.kr:8000/follow/?user_id='+props.id)
                .then((response) =>{
                    for(let i = 0; i < response.data.following_list.length; i++)
                        this.setState({list: this.state.list.concat({username: response.data.following_list[i].username, profileImg: response.data.following_list[i].profile_img})})
                })
        }else if(this.props.stat === 'follower'){
            axios.get('http://olloc.kr3.kr:8000/follow/?user_id='+props.id)
                .then((response) =>{
                    for(let i = 0; i < response.data.follower_list.length; i++)
                        this.setState({list: this.state.list.concat({username: response.data.follower_list[i].username, profileImg: response.data.follower_list[i].profile_img})})
                })
        }else alert("오류가 발생했습니다.")
    }

    render(){
        const list = this.state.list.map(
            (info) => <li><img src={info.profileImg} alt="프로필 이미지"/>{info.username}</li>
        )
        return(
            <div id="follow_list">
                <div id ="follow_list-bg" onClick={this.props.hide}>
                    <div id="follow_list-wrapper">
                        <div id="follow_list_header">
                            <h2 id="flh">{this.props.stat}</h2>
                        </div>
                        <ul>
                            {list}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default FollowList