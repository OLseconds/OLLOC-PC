import React, {Component} from 'react';
import MapAlert from "../components/Modules/MapAlert";
import '../Animation.css';
import PostSplit from "../components/Post/PostSplit";
import { withCookies, Cookies } from 'react-cookie';
import queryString from 'query-string';
import {instanceOf} from "prop-types";

class Home extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        const id = queryString.parse(this.props.location.search).id;
        if (!id) window.location.href='/';

        const script = document.createElement('script');
        script.async = true;    // 브라우저가 페이지를 파싱되는 동안에도 스크립트가 실행됨.
        script.src = "https://unpkg.com/swiper/js/swiper.js";
        document.head.appendChild(script);

        const axios = require('axios');
        axios.get('http://olloc.kr3.kr:8000/posts/?post_id=' + id, {
            headers: {Authorization: cookies.get('olloc') || 'Ben'}
        }).then((response) => {
                const {data} = response;
                this.setState({
                    posts: {
                        postId: data.id,
                        writerId: data.owner.id,
                        writer: data.owner.username,
                        profileImg: data.owner.profile_img,
                        description: data.description,
                        imagesURL: data.img,
                        likes: data.like,
                        likeState: data.likeState,
                        lx: data.lx,
                        ly: data.ly,
                        mapInfo: data.map_info,
                        comments: data.comments
                    }
                })
            }).catch( (error) => {
                console.log(error.response);
        })
        this.state = {
            id: queryString.parse(this.props.location.search).id,
            clicked: false,
            script: script,
        }
    }

    static defaultProps = {
        posts: {
            writer: "",
            profileImg: "https://placehold.it/58x58",
            description:"",
            imagesURL: [],
            likes: 0,
            likeState: false,
            comments: []
        }
    }

    getIndex = (index) =>{
        this.setState({
            mapLoc: {
                lat: this.state.posts.lx[index],
                lng: this.state.posts.ly[index],
                info: this.state.posts.mapInfo[index],
            }
        })
        this.checkClicked(true);
    }

    checkClicked = (getClicked) => {
        this.setState({
            clicked: getClicked,
        })
    }
    render(){
        return(
            <div>
                <PostSplit clicked={this.checkClicked} postInfo={this.state.posts} sendIndex={this.getIndex} script={this.state.script}/>
                {this.state.clicked && <MapAlert clicked = {this.checkClicked} mapLoc={this.state.mapLoc}/>}
            </div>
        );
    }
}

export default withCookies(Home);