import React, { Component } from 'react';
import UploadImageList from "./UploadImageList";
import * as exifr from 'exifr';

class ImageUp extends Component{
    id = 0
    state = {
        imgBase64: [], // 파일 base64
        imgFile: [] // 이미지파일
    };
    handleChangeFile = event => {
        let file = this.state.imgFile;
        // let imgFile = document.getElementById('ex_file').files;

        for (let i = 0; i < event.target.files.length; i++) {
            let img = event.target.files[i];
            file.push({id: this.id, file: img});
            this.setState({
                imgFile: this.state.imgFile.concat({url: img, index: i}),
            });
            let reader = new FileReader()
            if (event.target.files[i]) reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
            reader.onloadend = async e => {
                // 2. 읽기가 완료되면 아래코드가 실행
                let check;
                try {
                    const {latitude, longitude} = await exifr.gps(img);
                    console.log(latitude, longitude);
                    check = true;
                } catch (e) {
                    check = false;
                    alert("사진에 GPS정보가 없읍니다.")
                }
                const base64 = reader.result;//reader.readAsDataURL(event.target.files[0]); //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
                if (base64) {
                    this.setState({
                        imgBase64: this.state.imgBase64.concat({id: this.id++, file: base64.toString(), GPS: check}) // 파일 base64 상태 업데이트
                    });
                }
            };
        }
        this.setState({
            imgFile: file,
        })
        document.getElementById('ex_file').value = null;
    };

    handleRemove = (id) => {
        const {imgBase64, imgFile} = this.state;
        this.setState({
            imgBase64: imgBase64.filter(del => del.id !== id),
            imgFile: imgFile.filter(del => del.id !== id),
        });
    };

    render(){
        const imageList = this.state.imgBase64.map(
            preview => (<UploadImageList key={preview.id} id={preview.id} src={preview.file} GPS={preview.GPS} remove={this.handleRemove}/>)
        );
        return(
            <div>
                <div className="input_item">
                    <div className="input_title">대표이미지</div>
                </div>
                <div className="img_upload">
                    <div className="img_add">
                        <label htmlFor="ex_file" onChange={this.handleChangeFile}>
                            파일첨부
                        </label>
                        <input
                            multiple="multiple"
                            type="file"
                            name="imgFile[]"
                            id="ex_file"
                            className="ex_file"
                            onChange={this.handleChangeFile}
                        />
                    </div>
                    {imageList}
                </div>
            </div>
        )
    }
}

export default ImageUp;