import { useState, useEffect } from 'react';
import { getCommitsList } from '../../../services/firebase'
import Comment from './Comment';
import axios from 'axios';
import './commetnsManagement.scss'
import { editUserCommentAdmin } from '../../../services/firebase'

const CommentsManagementAdmin = () => {

  const [commentsId, setCommentsId] = useState([''])
  const [comments, setComments] = useState([''])
  const [cards, setCards] = useState([])
  const [arrowAmmount, setArrowAmmount] = useState('')
  const [arrowDate, setArrowDate] = useState('')

  useEffect(() => {
    getCommitsList()
      .then((data) => {
        const dataList = data
        setComments(Object.values(dataList))
        setCommentsId(Object.keys(dataList))
      })
      .catch((error) => {
        console.error(error)
      })
    fetchCards()
  }, [])

 

  const deleteComment = (idComment) => {
    editUserCommentAdmin(idComment)
      const commentsNew = comments.slice(0)
      const commentsIdNew = commentsId.slice(0)
      const idDelete = commentsId.indexOf(idComment)
      commentsIdNew.splice(idDelete, 1)
      commentsNew.splice(idDelete, 1)
      setComments(commentsNew)
      setCommentsId(commentsIdNew)
  }

  async function fetchCards() {
    const cards = await axios.get('https://kaori318.github.io/site/cards.json')
    setCards(cards.data)
  }

  function filterAmount() {
    if (comments.length > 0) {
      if (comments[0].rating > comments[comments.length - 1].rating) {
        const sortComments = comments.sort((a, b) => a.rating - b.rating)
        setComments(sortComments)
        setArrowAmmount('1')
      } else {
        const sortComments = comments.sort((a, b) => b.rating - a.rating)
        setComments(sortComments)
        setArrowAmmount('2')
      }
    }
  }

  function filterDate() {
    if (comments.length > 0) {
      if (Date.parse(comments[0].date) > Date.parse(comments[comments.length - 1].date)) {
        const sortComments = comments.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        setComments(sortComments)
        setArrowDate('1')
      } else {
        const sortComments = comments.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        setComments(sortComments)
        setArrowDate('2')
      }
    }
  }

  return (
    <div className="comments__container">
      <div className="comments__sort">
        <p>Сортировать по:</p>
        <div>
          <button id="radioDown" className='radio' name="radio"
            onClick={filterAmount}>
            {arrowAmmount === "1" && <span className='arrow'> &#9650;</span>}
            {arrowAmmount === "2" && <span className='arrow'> &#9660;</span>}
            {arrowAmmount === "" && <span> </span>}
          </button>
          <span>  по рейтингу </span>
        </div>
        <div>
          <button id="radioDown" className='radio' name="radio"
            onClick={filterDate}>
            {arrowDate === "1" && <span className='arrow'> &#9650;</span>}
            {arrowDate === "2" && <span className='arrow'> &#9660;</span>}
            {arrowDate === "" && <span> </span>}
          </button>
          <span>  по дате </span>
        </div>
      </div>
      <div className='comments__list'>
        {comments.length > 0 && cards.length > 0
          ? comments.map((com, i) =>
            <div className='comment' key={i}>
              <Comment comment={com} id={commentsId[i]} cardsComments={cards} card={com.card} idComment={deleteComment} />
            </div>)
          : <h1 style={{ textAlign: 'center' }}>Загрузка...</h1>
        }
      </div>
    </div>
  )
}

export default CommentsManagementAdmin