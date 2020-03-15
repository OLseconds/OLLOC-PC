import React from 'react';

const Images = (props) =>{
    const {index, url, sendIndex} = props;
    const doubleClickHandler = () => {
        sendIndex(index);
    }
    return(
        <img style={{height:'500px', width: '500px'}} src={url} alt="이미지 로딩 실패" onDoubleClick={doubleClickHandler}/>
    )
}

export default Images;