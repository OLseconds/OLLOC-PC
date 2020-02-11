import React, { Component } from 'react';
import '../style/PostInfo.scss';

class PostInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initDescription: "안녕하세요 OLLOC Test 입니다. 아직 API가 없어서 하드코딩이에요. 안녕하세요 OLLOC Test 입니다. 아직 API가 없어서 하드코딩이에요.",
            showDescription: "",
            showMore: false,
        };
    }
    componentWillMount() {
        const {initDescription} = this.state;
        if(initDescription.length >= 15) {
            this.setState({
                showDescription: initDescription.substr(0, 25) + " ",
                showMore: true,
            })
        }
    }

    componentDidMount(){
        const {description, initShowDescription} = this.state;
        this.setState({

        });
    }

    showMore = () => {
        this.setState({
            showMore: false,
            showDescription: this.state.initDescription,
        })
    }
    render() {
        return(
            <div id = "post-info">
                <div className="symbol-size">
                    <i className="far fa-heart"></i> <i className="far fa-comment"></i>
                </div>
                좋아요 12,142,342개
                <div className="description">
                    {this.state.showDescription}
                    {this.state.showMore && <a className="show-more" onClick={this.showMore}>더보기</a>}
                </div>
            </div>
        );
    }
}

export default PostInfo;