import React, {Component} from 'react';
import MapAlert from "../components/Modules/MapAlert";
import '../Animation.css';
import PostSplit from "../components/Post/PostSplit";
import queryString from 'query-string';

class Home extends Component{
    constructor(props) {
        super(props);
        const id = queryString.parse(this.props.location.search).id;
        if (!id) window.location.href='/';

        const axios = require('axios');
        axios.get('http://olloc.kr3.kr:8000/posts/?post_id=' + id)
            .then((response) => {
                const {data} = response;
                console.log(data);
                this.setState({
                    posts: {
                        writer: data.owner.username,
                        profileImg: data.owner.profile_img,
                        description: data.description,
                        imagesURL: data.img,
                        likes: 32898232,
                        likeState: false,
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
        }
    }

    static defaultProps = {
        posts: {
            writer: "yuzion",
            profileImg: "https://placehold.it/58x58",
            description:"",
            imagesURL: [
                "https://placehold.it/458x458",
                "https://placehold.it/128x128",
                "https://placehold.it/500x500"
            ],
            likes: 32898232,
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
                <PostSplit pageId={this.state.id} clicked={this.checkClicked} postInfo={this.state.posts} sendIndex={this.getIndex}/>
                {this.state.clicked && <MapAlert clicked = {this.checkClicked} mapLoc={this.state.mapLoc}/>}
            </div>
        );
    }
}

export default Home;