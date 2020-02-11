import React, { Component } from 'react';

class Comment extends Component {
    render(){
        return(
            <div id = "comment">
                <span style={{fontWeight: 'bold'}} className="comment-name">5linesys</span><span className="comment-text"> wow 개쩌름</span>
            </div>
        );
    }
}

export default Comment;