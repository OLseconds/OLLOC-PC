/*global Swiper*/
import React, {Component} from 'react';
import '../style/Slider.css'

class PostImages extends Component{
    componentDidMount() {
        const script = document.createElement('script');
        script.async = true;    // 브라우저가 페이지를 파싱되는 동안에도 스크립트가 실행됨.
        script.src = "https://unpkg.com/swiper/js/swiper.js";
        document.head.appendChild(script);

        script.onload = () =>{
            let mySwiper = new Swiper ('.swiper-container', {
                // Optional parameters
                direction: 'horizontal',

                // If we need pagination
                pagination: {
                    el: '.swiper-pagination',
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }

    }
    render() {
        return (
            <div className="swiper-container" style={{width: '500px', height: '500px'}}>
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><img className="swiper-index" src="https://placehold.it/458x458" /></div>
                    <div className="swiper-slide">Slide 2</div>
                    <div className="swiper-slide">Slide 3</div>
                </div>
                <div className="swiper-pagination"></div>

                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>

            </div>
        );
    }
}

export default PostImages;