import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class MyPost extends Component {
    state = {
        like: 0,
        comment: 0,
    }
    constructor(props) {
        super(props);
        const axios = require('axios');
        axios.get('http://olloc.kr3.kr:8000/posts/?post_id=' + this.props.postId)
            .then((response) => {
                this.setState({
                    like: response.data.like,
                    comment: response.data.comments.length,
                })
            })
    }

    render(){
        const {imageURL, postId} = this.props;
        return(
            <div id = "mypost">
                <Link to ={'/post?id=' + postId}>
                    <img src={imageURL} alt=""/>
                    <div className="img_info">
                        <div><i className="fas fa-heart"></i> <span id="likes">{this.state.like}</span></div>
                        <div><i className="fas fa-comment"></i> <span id="comments">{this.state.comment}</span></div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default MyPost;