import React from 'react';
import "./Reviews.scss"
import { useState, useEffect } from 'react';
import Review from './Review';
import {getCommitsList} from '../../services/firebase'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import axios from 'axios';
import { textAlign } from '@mui/system';


const Reviews = () => {

    const [reviews, setReviews] = useState([''])
    const [cards, setCards] = useState([])
    
    useEffect(() => { getCommitsList()
        .then((data) => {
            const dataList = data
            setReviews(Object.values(dataList))
        })
        .catch((error) => {
            console.error(error)
        })
        fetchCards()
        }, [])
   

    async function fetchCards() {
        const cards = await axios.get('https://kaori318.github.io/site/cards.json')
        setCards(cards.data)
    }

    return (
        <div className="reviews container">
            <h1 className="reviews__header">ОТЗЫВЫ</h1>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={true}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop="true"
                className="mySwiper"
            >
                {reviews.map((review, i) =>
                    <SwiperSlide key={i}>
                        {review && cards.length>0
                        ? <Review review={review} cardReview={review.card} cardsReview={cards}/>
                        : <h1 style={{textAlign:'center'}}>Загрузка...</h1>}
                        
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Reviews;