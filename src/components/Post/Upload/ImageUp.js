import React, { Component } from 'react';
import UploadImageList from "./UploadImageList";
import * as exifr from 'exifr';

class ImageUp extends Component{
    id = 0
    state = {
        data: [],
    };
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
                    const {latitude, longitude} = await exifr.gps(imgFile);
                    check = false;
                    lat = latitude;
                    lng = longitude;
                } catch (e) {
                    check = false;
                    lat = 0;
                    lng = 0 ;
                }
                const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
                if (base64) {
                    this.setState({
                        data: this.state.data.concat({id: this.id++, File: imgFile, imgBase64: base64.toString(), gps:{lat: lat, lng: lng, check: check,}, mapInfo: ""}),
                    })
                }
            };
        }
        document.getElementById('ex_file').value = null;
    };

    handleRemove = (id) => {
        const {data} = this.state;
        this.setState({
            data: data.filter(del => del.id !== id),
        });
    };

    getData = (data) => {
        this.setState({
            data: this.state.data.map(
                info => data.id === info.id
                ? {...info, ...data}
                : info
            )
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.data !== this.state.data) this.props.getImgGps(this.state.data);
    }

    render(){
        const imageList = this.state.data.map(
            preview => (<UploadImageList key={preview.id} id={preview.id} src={preview.imgBase64} GPS={preview.gps} mapInfo= {preview.mapInfo} remove={this.handleRemove} getData={this.getData}/>)
        );
        return(
            <div>
                <div className="input_item">
                    <div className="input_title"></div>
                </div>
                <div className="img_upload">
                    <div className="img_add">
                        <label className="upload_btn" htmlFor="ex_file" onChange={this.handleChangeFile}>
                            <i className="fas fa-camera"></i> 사진
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