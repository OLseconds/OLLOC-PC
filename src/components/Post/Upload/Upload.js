import React, {Component} from 'react';
import SearchMap from './SearchMap';
import ImageUp from './ImageUp';

class Upload extends Component{
    render(){
        return(
            <div>
                <span>게시물 만들기</span>
                <input
                    type="text"
                    placeholder="게시글을 작성해보세요!"
                />

                <SearchMap></SearchMap>
                지도
                이미지
                글
            </div>
        );
    }
}

export default Upload;