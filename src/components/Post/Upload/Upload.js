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
            <div>
                <span>게시물 만들기</span>
                <input
                    type="text"
                    placeholder="게시글을 작성해보세요!"
                />
                <ImageUp></ImageUp>
                <button>업로드</button>
            </div>
        );
    }
}

export default Upload;