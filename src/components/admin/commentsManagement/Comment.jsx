import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import imgDelete from '../../../assets/delete_1.png'

const Comment = ({ comment, cardsComments, card, id, idComment }) => {

    const [cardIndex, setCardIndex] = useState('')
    const [rating, setRating] = useState(comment.rating)
    const [cards, setCards] = useState(cardsComments)

    useEffect(() => {
        const card1 = card
        const index = cards.findIndex(el => el.name === card1);
        setCardIndex(cards[index])
    }, [cardsComments])

    const date = new Date(comment.date).toLocaleDateString()

    return (
        <div className='comment__container'>
            <div className='comment__body'>
                <img
                    src={cardIndex?.img}
                    alt={comment.card}
                />
                <div className='comment__text'>
                    <p className='comment__text-date'>{date}</p>
                    <p className='comment__text-name'>{comment.name}</p>
                    <Box className='comment__rating-box' sx={{ '& > legend': { mt: 2 }, }}>
                        <Rating className='comment__rating' name="read-only" value={comment.rating} readOnly />
                    </Box>
                    <p className='comment__text-comment'>{comment.comment}</p>
                </div>
            </div>
            <div className='comments__delete'>
                <button onClick={() => idComment(id)}>
                    <img src={imgDelete} alt="delete" />
                </button>
            </div>
        </div>

    );
};

export default Comment;