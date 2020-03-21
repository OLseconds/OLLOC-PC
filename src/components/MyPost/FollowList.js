import React, {Component} from 'react';
import '../../style/FollowList.scss';

class FollowList extends Component{
    state = {
        status: null,
        list: [],
        fade: 'in',
    }
    constructor(props){
        super(props);

        const axios = require('axios');
        console.log(props.stat)
        if(this.props.stat === 'follow'){
            axios.get('http://olloc.kr3.kr:8000/follow/?user_id=44')
                .then((response) =>{
                    console.log(response);
                    for(let i = 0; i < response.data.following_list.length; i++)
                        this.setState({list: this.state.list.concat({username: response.data.following_list[i].username, profileImg: response.data.following_list[i].profile_img})})
                })
        }else if(this.props.stat === 'follower'){
            axios.get('http://olloc.kr3.kr:8000/follow/?user_id=44')
                .then((response) =>{
                    console.log(response);
                    for(let i = 0; i < response.data.follower_list.length; i++)
                        this.setState({list: this.state.list.concat({username: response.data.follower_list[i].username, profileImg: response.data.follower_list[i].profile_img})})
                })
        }else alert("오류가 발생했습니다.")
    }
    test = () => {
        this.setState({fade: 'out'});
        this.props.hide();
    }
    render(){
        const list = this.state.list.map(
            (info) => <li><img src={info.profileImg} alt="프로필 이미지"/>{info.username}</li>
        )
        return(
            <div id="follow_list" className={"fade"+this.state.fade}>
                <div id ="follow_list-bg" onClick={this.test}>
                    <div id="follow_list-wrapper">
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