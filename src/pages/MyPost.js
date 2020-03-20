import React, {Component} from 'react';
import MyTimeline from "../components/MyPost/MyTimeline";
import "../style/MyPost.scss";
import { withCookies, Cookies } from 'react-cookie';
import queryString from "query-string";
import {instanceOf} from "prop-types";

class MyPost extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        isLogin: false,
        data: {
            userId: null,
            profileImg: '',
            userName: '',
            postsNum: 0,
            follower: 0,
            follow: 0,
            followState: false,
        },
        imagesURL: [],
    }
    constructor(props) {
        super(props);
        const { cookies } = props;

        let id = queryString.parse(this.props.location.search).id;
        if (!id) window.location.href='/';
        const axios = require('axios');

        axios.get('http://olloc.kr3.kr:8000/auth/',
            {headers: {Authorization: cookies.get('olloc' || 'Ben')}})
            .then(() => {
                this.setState({
                    isLogin: true,
                })
            })

        axios.get('http://olloc.kr3.kr:8000/follow/?user_id=' + id,
            {headers: {Authorization: cookies.get('olloc') || 'Ben'}})
            .then((response) => {
                this.setState({
                    data: {
                        ...this.state.data,
                        followState: response.data.is_following,
                    }
                })
            }).catch(() => {
        })

        axios.get('http://olloc.kr3.kr:8000/user/?user_id=' + id)
            .then((response) => {
                const {data} =response;
                this.setState({
                    data:{
                        userId: id,
                        profileImg: data.profile_img,
                        userName: data.username,
                        follower: data.follower,
                        follow: data.following,
                    }
                })
            }).catch(() => {
        })
        axios.get('http://olloc.kr3.kr:8000/timeline/?user_id=' + id)
            .then((response) => {
                for(let i = 0; i < response.data.length; i++){
                    this.setState({
                        imagesURL: this.state.imagesURL.concat({id: response.data[i].id, url: response.data[i].img[0]}),
                    })
                }
                this.setState({
                    data: {
                        ...this.state.data,
                        postsNum: response.data.length,
                    }
                })
            }).catch(() => {
                alert("서버에 문제가 발생했습니다.");
        })
    }

    followHandler = () => {
        const { cookies } = this.props;
        let check = cookies.get('olloc') || 'Ben';

        if(this.state.data.followState) {
            const axios = require('axios');
            axios.delete('http://olloc.kr3.kr:8000/follow/?user_id=' + queryString.parse(this.props.location.search).id,
                {headers: {Authorization: check},}
            ).then(() => {
                this.setState({
                    data: {
                        ...this.state.data,
                        follower: this.state.data.follower-1,
                        followState: !this.state.data.followState,
                    }
                })
            }).catch((error) => {
                if (!error.response) {
                    alert("서버 오류로 팔로우하지 못했습니다.")
                } else alert("로그인 후 이용 가능합니다.")
            })
        }else{
            if(check !== 'Ben') {
                const axios = require('axios');
                axios.post('http://olloc.kr3.kr:8000/follow/',
                    {'user_id': queryString.parse(this.props.location.search).id},
                    {headers: {Authorization: check},}
                ).then(() => {
                    this.setState({
                        data: {
                            ...this.state.data,
                            follower: this.state.data.follower+1,
                            followState: !this.state.data.followState,
                        }
                    })
                }).catch((error) => {
                    if(!error.response){alert("서버 오류로 언팔로우하지 못했습니다.")}
                    else alert("로그인 후 이용 가능합니다.")
                })
            }else{
                alert("로그인 후 이용 가능합니다.")
            }
        }
    }
    render(){
        return (
          <div>
              <MyTimeline followHandler={this.followHandler} data = {this.state.data} imagesURL = {this.state.imagesURL} isLogin={this.state.isLogin}/>
          </div>
        );
    }
}

export default withCookies(MyPost);