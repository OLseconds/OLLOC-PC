import React, { Component } from 'react';

class Comment extends Component {
    render(){
        return(
            <div id = "comment">
                <span style={{fontWeight: 'bold'}} className="comment-name">{this.props.name}</span><span className="comment-text"> {this.props.comment}</span>
            </div>
        );
    }
}

export default Comment;