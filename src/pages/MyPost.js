import React, {Component} from 'react';
import MyTimeline from "../components/MyPost/MyTimeline";
import "../style/MyPost.scss";

class MyPost extends Component {
    state = {
        data: {
            profileImg: 'https://placehold.it/58x58',
            userName: 'javci_wai',
            postsNum: 9,
            follower: 2389234,
            follow: 112,
        },
        imagesURL: [
            "https://placehold.it/58x58",
            "https://placehold.it/58x58",
            "https://placehold.it/58x58",
            "https://placehold.it/58x58",
            "https://placehold.it/58x58",
            "https://placehold.it/58x58",
            "https://placehold.it/58x58",
            "https://placehold.it/58x58",
            "https://placehold.it/58x58",
        ]
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