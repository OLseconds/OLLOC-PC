import React, {Component} from 'react';
import SearchMap from './SearchMap';
import ImageUp from './ImageUp';
import "../../../style/Upload.scss"

class Upload extends Component{
    state = {
        mode: false,
    }

    modeToggle = () => {
        this.setState({
            mode: !this.state.mode,
        })
    }
    getImgGPS = (data) => {

    }

    render(){
        return(
            <div id="post">
                <div id="make_post">
                    <h3>안녕하세요. OOO님.</h3>
                    <div className="post_btn">
                        <div className="post_btn_cont" onClick = {this.modeToggle}>
                            오늘은 무엇을 하셨나요?
                        </div>
                    </div>
                </div>
                {this.state.mode && <div id="upload_form_background" onClick={this.modeToggle}></div>}
                {this.state.mode && <div id="upload_form">
                    <div className="form_cont">
                        <div className="form_header">
                            <h2>게시물 작성하기</h2><div className="close_form" onClick={this.modeToggle}>X</div>
                        </div>
                        <textarea placeholder="오늘 무슨 일이 있었나요?"></textarea>
                        <ImageUp></ImageUp>
                        <button className="parkBtn">게시하기</button>
                    </div>
                </div>}
            </div>
        );
    }
}

export default Upload;