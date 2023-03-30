import './personalData.scss'
import { useState } from 'react'
import { useAuth } from '../../hooks/use-auth'
import imgPersonalArea from '../../assets/personalArea.png'
import imgEdit from '../../assets/edit.png'
import { useDispatch } from 'react-redux'
import { editUser } from '../../store/auth/action'
import { editUserName, editUserEmail, editUserPhone } from '../../services/firebase'
import Loader from '../../ui/Loader'


const PersonalData = () => {
  const { email, name, id, phone } = useAuth()
  const [editName, setEditName] = useState(false)
  const [userName, setUserName] = useState(name)
  const [userPhone, setUserPhone] = useState(phone)
  const [editPhone, setEditPhone] = useState(false)
  const [userEmail, setUserEmail] = useState(email)
  const [editEmail, setEditEmail] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const handleEditName = () => {
    setEditName(!editName)
  }

  const handleEditPhone = () => {
    setEditPhone(!editPhone)
  }

  const handleEditEmail = () => {
    setEditEmail(!editEmail)
  }

  const handleSaveUserData = () => {
    setLoading(true)
    dispatch(editUser({
      name: userName,
      phone: userPhone,
      email: userEmail
    }))
    editUserEmail(id, userEmail, setErrorMessage, setLoading)
    editUserName(id, userName)
    editUserPhone(id, userPhone)
    setEditName(false)
    setEditPhone(false)
    setEditEmail(false)
  }

  return (
    <>
      <div className="personalData">
        <div className="personalData__top">
          <img src={imgPersonalArea} alt="img personal area" />
          <h2>Личные данные</h2>
        </div>

        {loading && (
          <Loader />
        )}
        <div className="personalData__wrapper">
          {errorMessage ?
            <div className="personalData__error" >{errorMessage}</div> : null
          }
          <span className="mobile">Имя</span>
          <div className="personalData__input-item">
            <span>Имя</span>
            {editName
              ? <input
                id='name'
                type="text"
                value={userName}
                autoFocus={true}
                onChange={(event) => setUserName(event.target.value)}
              />
              : <p>{name}</p>
            }
            <button onClick={handleEditName}>
              <img src={imgEdit} alt="edit" />
            </button>
          </div>
          <span className="mobile">Тел.</span>
          <div className="personalData__input-item">
            <span>Тел.</span>
            {editPhone
              ? <input
                type="text"
                value={userPhone}
                autoFocus={true}
                onChange={(event) => setUserPhone(event.target.value)}
              />
              : <p>{phone}</p>
            }
            <button onClick={handleEditPhone}>
              <img src={imgEdit} alt="edit" />
            </button>
          </div>
          <span className="mobile">Email</span>
          <div className="personalData__input-item">
            <span>Email</span>
            {editEmail
              ? <input
                type="text"
                value={userEmail}
                autoFocus={true}
                onChange={(event) => setUserEmail(event.target.value)}
              />
              : <p>{email}</p>
            }
            <button onClick={handleEditEmail}>
              <img src={imgEdit} alt="edit" />
            </button>
          </div>
        </div>
        <button onClick={handleSaveUserData} className="personalData__btn-save">Сохранить</button>
      </div>
    </>
  )
}

export default PersonalData