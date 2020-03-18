import React, {Component} from 'react';
import '../../style/Profile.scss';

class ProfileSetting extends Component{
    state={
        profileImg: null,
    }
    handleChangeFile = event => {
        // let imgFile = document.getElementById('ex_file').files;
        for (let i = 0; i < event.target.files.length; i++) {
            let imgFile = event.target.files[i];
            let check, lat, lng;

            let reader = new FileReader()
            if (event.target.files[i]) reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
            reader.onloadend = async e => {
                // 2. 읽기가 완료되면 아래코드가 실행
                try {
                    //완료되면 어케 할꺼뉘~~
                    const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
                    if (base64) {
                        this.setState({
                            profileImg: base64.toString(),
                        })
                    }
                } catch (e) {
                    console.log(e)
                    this.setState({
                        imgState:false,
                    })
                }
            };
        }
        document.getElementById('ex_file').value = null;
    };

    render(){
        return(
            <div id='profile-setting'>
                <div className="img_add">
                    <img style={{width: '64px', height:'64px'}}src={this.state.profileImg} alt=""/>
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
                    별명 : <input type="text"
                        name="username"
                    />
                    <button>완료</button>
                    <button>회원탈퇴</button>
            </div>
        )
    }
}

export default ProfileSetting