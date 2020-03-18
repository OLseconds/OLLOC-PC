import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Comment extends Component {
    render(){
        return(
            <div id = "comment">
                <Link to={"/mypost?id="+this.props.id} className={"name-btn"}><span style={{fontWeight: 'bold'}} className="comment-name">{this.props.name}</span></Link><span className="comment-text"> {this.props.comment}</span>
            </div>
        );
    }
}

export default Comment;