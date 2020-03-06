import React from 'react';

const UploadImageList = ({id, src, GPS, remove}) => {
    const onRemove = () =>{
        remove(id);
    }
    return(
        <div>
            <button onClick={onRemove}>삭제</button>
            {GPS.check?<button>정보 있음</button>: <button>정보 없음</button>}
            <img style={{width: "100px", height: "100px"}} src={src} alt="미리보기 실패"/>
        </div>
    );
}

export default UploadImageList;