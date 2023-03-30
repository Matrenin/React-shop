import './commentUser.scss'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addAuthComment } from '../../store/auth/action'
import { selectCard } from '../../store/card/actions'
import { editUserComment } from '../../services/firebase'
import { useAuth } from '../../hooks/use-auth'
import { nanoid } from 'nanoid'
import MyCommetns from '../myCommetns/MyCommetns'
import  StarRating from '../../ui/StarRating'
import SelectImpression from '../selectImpression/SelectImpression'


const CommentUser = () => {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const card = useSelector(store => store.card.name)

  const { id } = useAuth()

  const idComment = nanoid()
  const [showMyComments, setShowMyComments] = useState(false)

  const dispatch = useDispatch()

  const selectRating = value => {
    setRating(value)
  }

  const handleSend = () => {
    if (card === '' || name === '' || comment === '' || rating === 0) {
      return
    }
    let commentObj = {
      [idComment]: {
        name,
        rating,
        comment,
        card,
        date: new Date().toLocaleDateString()
      }
    }
    dispatch(addAuthComment(commentObj)) // добавляет комментарий в стор user, в свойство comments
    editUserComment(id, name, rating, comment, card, new Date().toLocaleDateString() )
    setRating(0)
    setComment('')
    setName('')
    dispatch(selectCard({}))
  }

  const handleShowComments = () => {
    setShowMyComments(!showMyComments)
  }

  return (
    <div className="commentUser__wrraper">
      <div className="commentUser">
      <h3>Здесь Вы можете поделиться своими впечатлениями</h3>
      <div className="commentUser__box">
        <div className="commentUser__item commentUser__item__raiting">
          <p className="commentUser__item-text">Ваша оценка: </p>
          <div className="commentUser__rating">
            <StarRating rating={rating} selectRating={selectRating}/>
          </div>
        </div>
        <div className="commentUser__item commentUser__item-input">
          <p className="commentUser__item-text">Ваше имя: </p>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
        </div>
        <div className="commentUser__item commentUser__item-input">
          <p className="commentUser__item-text">Название: </p>
          <div className="commentUser__item-select">
            <SelectImpression/>
          </div>
        </div>
        <div className="commentUser__item comment-textarea commentUser__item-input">
          <p className="commentUser__item-text">Отзыв: </p>
          <textarea
            name="comment"
            id="commentId"
            cols="57"
            rows="10"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
        </div>
      </div>
        <button className="commentUser__btn-save" onClick={handleSend}>Отправить</button>
        <button className="commentUser__btn-myComments" onClick={handleShowComments}>Мои отзывы</button>
      </div>
      { showMyComments && <MyCommetns/> }
    </div>
  )
}

export default CommentUser