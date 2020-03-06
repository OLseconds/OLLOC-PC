import React, {Component} from 'react';
import SearchMap from './SearchMap';
import ImageUp from './ImageUp';

class Upload extends Component{
    state = {
        locName: "",
        lat: 0,
        lng: 0,
    }

    getMapData = (data) =>{
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
                {"위치: " + this.state.locName}
                <SearchMap getData={this.getMapData}></SearchMap>
                지도
                이미지
                글
            </div>
        );
    }
}

export default Upload;