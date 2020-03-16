import React, {Component} from 'react';
import MyTimeline from "../components/MyPost/MyTimeline";
import "../style/MyPost.scss";
import queryString from "query-string";

class MyPost extends Component {
    state = {
        data: {
            profileImg: '',
            userName: '',
            postsNum: 0,
            follower: 0,
            follow: 0,
        },
        imagesURL: [],
        postId: [],
    }
    constructor(props) {
        super(props);

        const id = queryString.parse(this.props.location.search).id;
        if (!id) window.location.href='/';
        console.log(id);
        const axios = require('axios');
        axios.get('http://olloc.kr3.kr:8000/user/?user_id=' + id)
            .then((response) => {
                const {data} =response;
                this.setState({
                    data:{
                        profileImg: data.profile_img,
                        userName: data.username,
                        follower: data.follower,
                        follow: data.following,
                    }
                })
            }).catch(() => {
            alert("서버에 문제가 발생했습니다.");
        })
        axios.get('http://olloc.kr3.kr:8000/timeline/?user_id=' + id)
            .then((response) => {
                console.log(response)
                for(let i = 0; i < response.data.length; i++){
                    this.setState({
                        imagesURL: this.state.imagesURL.concat({id: response.data[i].id, url: response.data[i].img[0]}),
                        postId: this.state.postId.concat(response.data[i].id),
                    })
                }
                this.setState({
                    data: {
                        ...this.state.data,
                        postsNum: response.data.length,
                    }
                })
            }).catch( () => {
                alert("서버에 문제가 발생했습니다.");
        })
    }
    render(){
        return (
          <div>
              <MyTimeline data = {this.state.data} imagesURL = {this.state.imagesURL} />
          </div>
        );
    }
}

export default MyPost;