import React, {Component} from 'react';
import '../../style/Profile.scss';

class ProfileSetting extends Component{
    state={
        profileImg: this.props.profileImg,
        imgGet: false,
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.profileImg !== prevState.profileImg && !prevState.imgGet){
            return{profileImg: nextProps.profileImg}
        }
    }

    handleChangeFile = event => {
        let reader = new FileReader()
        if (event.target.files[0]) reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
        reader.onloadend = async e => {
            // 2. 읽기가 완료되면 아래코드가 실행
            try {
                const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
                if (base64) {
                    this.setState({
                        profileImg: base64.toString(),
                        imgGet: true,
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

    render(){
        return(
            <div id='profile-setting'>
                <div id='profile-background' onClick={this.props.toggle}></div>
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
                    <button className="profile-btn">회원탈퇴</button>
                    <button className="profile-btn">완료</button>
                </div>
            </div>
        )
    }
}

export default ProfileSetting