import React, {Component} from 'react';
import { withCookies, Cookies } from 'react-cookie';
import '../../style/Profile.scss';
import {instanceOf} from "prop-types";

class ProfileSetting extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    state={
        profileImg: this.props.profileImg,
        imgGet: false,
        visible: true,
        changeImg: false,
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.profileImg !== prevState.profileImg && !prevState.imgGet){
            return{profileImg: nextProps.profileImg}
        }
    }

    handleChangeFile = event => {
        let imgFile = event.target.files[0];
        let reader = new FileReader()
        if (event.target.files[0]) reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
        reader.onloadend = async e => {
            // 2. 읽기가 완료되면 아래코드가 실행
            try {
                const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
                if (base64) {
                    this.setState({
                        profileImg: base64.toString(),
                        image: imgFile,
                        imgGet: true,
                        changeImg: true,
                    })
                }
            } catch (e) {
                console.log(e)
                this.setState({
                    imgGet: false,
                })
            }
        };
        document.getElementById('ex_file').value = null;
    };

    visibleFalse = () => {
        this.setState({visible: false})
        this.props.toggle()
    }

    changeProfile = () => {
        const { cookies } = this.props;
        const token = cookies.get('olloc') || 'Ben';


        const form = new FormData();
        form.append('user_id', this.props.userId);
        form.append('image', this.state.image);
        if(this.state.changeImg){
            const axios = require('axios');
            axios.post('http://olloc.kr3.kr:8000/user/', form,
                {headers: {Authorization: token}})
            .then((response) => {
                window.location.reload(true);
            }).catch((error) => {
                console.log(error);
                console.log(error.response);
            })
        }else alert("이미지를 선택해주세요!")

    }

    exitOlloc = () =>{
        alert("기능 구현 중 입니다 ^^");
    }

    render(){
        return(
            <div id='profile-setting' className={(this.state.visible?"fadein":"fadeout")}>
                <div id='profile-background' onClick={this.visibleFalse}></div>
                <div id='profile-wrapper'>
                    <div className="img_add">
                        <img id="profile-profile_img" src={this.state.profileImg} alt=""/>
                        <label className="upload_btn" htmlFor="ex_file" onChange={this.handleChangeFile}>
                            <i className="fas fa-camera"></i> 변경
                        </label>
                        <input
                            type="file"
                            name="imgFile[]"
                            id="ex_file"
                            className="ex_file"
                            onChange={this.handleChangeFile}
                        />
                    </div>
                    <span id="user-name" >별명 : <input type="text" value={this.props.userName}  name="username"/></span>
                    <button className="profile-btn" onClick={this.exitOlloc}>회원탈퇴</button>
                    <button className="profile-btn" onClick={this.changeProfile}>완료</button>
                </div>
            </div>
        )
    }
}

export default withCookies(ProfileSetting);