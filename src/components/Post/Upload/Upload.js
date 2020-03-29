import React, {Component} from 'react';
import ImageUp from './ImageUp';
import "../../../style/Upload.scss"

class Upload extends Component{
    state = {
        mode: false,
        content: "",
        data: [],
    }

    modeToggle = () => {
        this.setState({
            mode: !this.state.mode,
        })
    }

    textChangeHandler = (e) => {
        this.setState({
            content: e.target.value,
        })
    }

    getImgGPS = (data) => {
        this.setState({
            data: data,
        })
    }


    submitHandle = () => {
        const {token} = this.props;
        const {data, content} = this.state;
        if(!content) {
            alert("게시물 내용을 입력해 주세요");
            return;
        }

        if(!data.length){
            alert("사진을 올려주세요");
            return;
        }
        for(let i = 0; i < data.length; i++){
            if(!data[i].gps.check){
                alert(i+1+"번 째 게시물 지도 정보를 입력해주세요!")
                return;
            }
        }

        let form = new FormData();
        for(let i = 0; i < data.length; i++){
            form.append('image', data[i].File);
            form.append('lx', data[i].gps.lat);
            form.append('ly', data[i].gps.lng);
            form.append('map_info', data[i].mapInfo);
        }
        form.append('content', content);

        const axios = require('axios');
        const header = {
            headers:
                {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
        }
        axios.post('http://olloc.kr3.kr:8000/posts/', form, header
        ).then( () => {
            window.location.reload(true);
        }).catch( (error) => {
            if(!error.response) alert("서버에 문제가 발생했습니다.")
            else if(error.response.data.error_code) alert("업로드 실패(이미지 파일 올려주세요)");
            else alert("알 수 없는 에러로 업로드에 실패했습니다.");
        })

    }
    render(){
        return(
            <div id="post">
                <div id="make_post">
                    <h3>안녕하세요. {this.props.userName}님.</h3>
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
                        <textarea placeholder="오늘 무슨 일이 있었나요?" value={this.state.content} onChange={this.textChangeHandler}></textarea>
                        <ImageUp getImgGps = {this.getImgGPS}></ImageUp>
                        <button className="parkBtn" onClick={this.submitHandle}>게시하기</button>
                    </div>
                </div>}
            </div>
        );
    }
}

export default Upload;