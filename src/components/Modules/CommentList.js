import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Comment from './Comment';

class CommentList extends Component {
    static defaultProps = {
        information: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            commentList1: nextProps.information.slice(0, 2).map(
                (information, index) => <Comment key={index} name={information.owner.name} comment={information.comment} />
            ),
            commentList2: nextProps.information.slice(2, nextProps.information.length).map(
                (information, index) => <Comment key={index} name={information.owner.name} comment={information.comment} />
            ),
            commentOverFlow: false,
        }
    }

    componentWillMount() {
        if(this.props.information.length > 2) {
            this.setState({
                commentOverFlow: true,
            })
        }
    }

    render() {
        if(this.props.beforeProps){
            return (
                <div id = "comment-list" style={{padding: '0 10px 10px 10px'}}>
                    {this.state.commentList1}
                    {this.state.commentList2}
                </div>
            );
        }else{
            return (
                <div id = "comment-list" style={{padding: '0 10px 10px 10px'}}>
                    {this.state.commentOverFlow &&  <Link className="show-more" to ="/post">댓글 {this.props.information.length}개 모두 보기</Link>}
                    {this.state.commentList1}
                </div>
            );
        }
    }
}
export default CommentList;