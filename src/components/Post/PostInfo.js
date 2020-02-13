import React, { Component } from 'react';
import '../../style/PostInfo.scss';

class PostInfo extends Component {
    static defaultProps = {
        initDescription: '',
        likes: 0,
        likeState: false,
        beforeProps: false,
    }


    constructor(props) {
        super(props);
        this.state = {
            showDescription: "",
            showMore: false,
            likes: this.props.likes,
            likeState: this.props.likeState,
        };
    }
    componentWillMount() {
        const {initDescription} = this.props;
        if(~initDescription.indexOf('\n')){
            this.setState({
                showDescription: initDescription.split('\n')[0].substr(0, 25),
                showMore: true,
            })
        }else if(initDescription.length >= 25) {
            this.setState({
                showDescription: initDescription.substr(0, 25) + " ",
                showMore: true,
            })
        }else{
            this.setState({
                showDescription: initDescription,
            })
        }
    }

    showMore = () => {
        this.setState({
            showMore: false,
            showDescription: this.props.initDescription,
        })
    }

    likesToggle = () => {
        const {likeState, likes} = this.state;
        if(!likeState){
            this.setState({
                likeState: !likeState,
                likes: likes+1,
            })
        }else{
            this.setState({
                likeState: !likeState,
                likes: likes-1,
            })
        }
    }

    render() {
        const {showDescription, showMore, likes, likeState} = this.state;
        if(this.props.beforeProps){
            return(
                <div id = "post-info">
                    <div className="description">
                        {this.state.showMore ? showDescription : showDescription.split('\n').map( line => { return (<span>{line}<br/></span>)})}{showMore && <a style={{display: 'inline'}}className="show-more" onClick={this.showMore}> 더보기</a>}
                    </div>
                    <div className="symbol-size">
                        {likeState ? <span style={{userSelect: 'none', fontSize:'1.7rem', color: 'red'}} onClick={this.likesToggle}>♥ </span>:<span style={{userSelect: 'none' , fontSize:'1.7rem'}} onClick={this.likesToggle}>♡ </span>}
                        <i className="far fa-comment" />
                    </div>
                    좋아요 {likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}개
                </div>
            );
        }else{
            return(
                <div id = "post-info">
                    <div className="symbol-size">
                        {likeState ? <span style={{userSelect: 'none', fontSize:'1.7rem', color: 'red'}} onClick={this.likesToggle}>♥ </span>:<span style={{userSelect: 'none' , fontSize:'1.7rem'}} onClick={this.likesToggle}>♡ </span>}
                        <i className="far fa-comment" />
                    </div>
                    좋아요 {likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}개
                    <div className="description">
                        {this.state.showMore ? showDescription : showDescription.split('\n').map( line => { return (<span>{line}<br/></span>)})}{showMore && <a style={{display: 'inline'}}className="show-more" onClick={this.showMore}> 더보기</a>}
                    </div>
                </div>
            );
        }
    }
}

export default PostInfo;