import React, {Component} from 'react';
import SearchMap from './SearchMap';
import ImageUp from './ImageUp';
import "../../../style/Upload.scss"

class Upload extends Component{
    state = {
        locName: "",
        lat: 0,
        lng: 0,
    }

    getImgLoc = (data) =>{
        this.setState({
            locName: data.locName,
            lat: data.lat,
            lng: data.lng,
        })
    }

    render(){
        return(
            <div id="post">
                <div id="make_post">
                    <h3>안녕하세요. OOO님.</h3>
                    <div className="post_btn">
                        <div className="post_btn_cont">
                            오늘은 무엇을 하셨나요?
                        </div>
                    </div>
                </div>
                <div id="upload_form_background"></div>
                <div id="upload_form">
                    <div className="form_cont">
                        <div className="form_header">
                            <h2>게시물 작성하기</h2><div className="close_form" onClick="">X</div>
                        </div>
                        <textarea placeholder="오늘 무슨 일이 있었나요?"></textarea>
                        <ImageUp></ImageUp>
                        <button className="parkBtn">게시하기</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;