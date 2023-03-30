import './application.scss'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'
import { addApplication } from '../../store/applications/actions'
import { closeModal, openModalSended } from '../../store/modal/actions'
import { Modal } from '../modal/modal'
import Sended from '../sended/Sended'
import { writeApplicationList, writeUserApplication, writeUserApplicationStatus } from '../../services/firebase'
import { useAuth } from '../../hooks/use-auth'
import { addAuthApplications } from '../../store/auth/action'
import SelectImpression from '../selectImpression/SelectImpression'

export function Application() {
    const { isAuth, id } = useAuth()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    // const [commit, setCommit] = useState('')
    const [email, setEmail] = useState('')
    const [errorName, setErrorName] = useState(false)
    const [errorPhone, setErrorPhone] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [agree, setAgree] = useState(false)
    const idApplication = nanoid()
    const modalSended = useSelector(store => store.modal.modalSended)
    const card = useSelector(store => store.card)
    const userName = useSelector(store => store.user.name)
    const userPhone = useSelector(store => store.user.phone)
    const userEmail = useSelector(store => store.user.email)

    const getDate = () => {
        const currentDate = new Date()
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        if (day < 10) {
            day = `${'0' + day}`
        }
        if (month < 10) {
            month = `${'0' + month}`
        }
        return `${day}.${month}.${year}`
    }

    const dispatch = useDispatch()

    const codeDuplication = () => {
        setName('')
        setPhone('')
        setEmail('')
        // setCommit('')
        dispatch(closeModal(false))
        dispatch(openModalSended(true))
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!isAuth) {
            if (!errorName && !errorPhone && !errorEmail && phone && name && email && agree && card) {
                let applicationObj = {
                    [idApplication]: {
                        name,
                        phone,
                        email,
                        card
                    }
                }

                dispatch(addApplication(applicationObj))
                codeDuplication()
                writeApplicationList(idApplication, name, phone, card, email)
            } else {
                return
            }
        } else {
            if (card.id !== undefined) {
                let applicationObj = {
                    [idApplication]: {
                        card,
                        status: {status: 'В обработке'},
                        date: getDate()
                    }
                }
                const date = getDate()
                const status = 'В обработке'
                dispatch(addAuthApplications(applicationObj))
                dispatch(addApplication(applicationObj)) // добавляю в стор applications
                codeDuplication()
                writeUserApplication(id, idApplication, card, date, userName, userPhone, userEmail)
                writeUserApplicationStatus(id, idApplication, status)
            } else {
                return
            }
        }
    }

    function checkName(event) {
        setName(event.target.value)
        if (/^[А-ЯЁ,\s]+$/i.test(event.target.value) && name.length) {
            setErrorName(false)
        } else {
            setErrorName(true)
        }
    }

    function checkPhone(event) {
        setPhone(event.target.value)
        if (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(event.target.value) && phone.length) {
            setErrorPhone(false)
        } else {
            setErrorPhone(true)
        }
    }

    function checkEmail(event) {
        setEmail(event.target.value)
        if (/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(event.target.value) && email.length) {
            setErrorEmail(false)
        } else {
            setErrorEmail(true)
        }
    }

    return (
        <>
            <form className='application' onSubmit={(event) => handleSubmit(event)}>
                <div className='application__head'>
                    <h2 className='application__head__title' >Отправьте заявку</h2>
                    <p className='application__head__subtitle' >Мы свяжемся с Вами в ближайшее время</p>
                </div>
                {isAuth
                    ? <p className="application__user-text">{userName ? userName : 'Имя'}</p>
                    : (errorName ? <input className='application__input_false' type='text'
                        placeholder='Имя кирилицей'
                        required
                        value={name}
                        onChange={checkName}
                    ></input>
                        : <input className='application__input' type='text'
                            placeholder='Имя'
                            required
                            value={name}
                            onChange={checkName}
                        ></input>)
                }
                {isAuth
                    ? <p className="application__user-text">{userPhone ? userPhone : 'Телефон'}</p>
                    : (errorPhone ? <input
                        className='application__input_false'
                        type='text'
                        placeholder='Телефон'
                        required
                        value={phone}
                        onChange={checkPhone}
                    ></input> :
                        <input
                            className='application__input'
                            type='text'
                            placeholder='Телефон'
                            required
                            value={phone}
                            onChange={checkPhone}
                        ></input>
                    )
                }
                { isAuth
                    ? <p className="application__user-text">{userEmail ? userEmail : 'Email'}</p>
                    : (errorEmail ? <input className='application__input_false' type='email'
                        placeholder='Email'
                        required
                        value={email}
                        onChange={checkEmail}
                    ></input>
                        : <input className='application__input' type='email'
                            placeholder='Email'
                            required
                            value={email}
                            onChange={checkEmail}
                        ></input>)
                }

                <div className="application__select">
                    <SelectImpression/>
                </div>

                <label className='application__checkbox' ><input className='application__checkbox__input}=' type='checkbox'
                    onChange={() => setAgree(!agree)}></input>
                    Отправляя заявку Вы соглашаетесь на обработку <span>персональных данных</span></label>

                <button className='application__btn' type='submit'>Отправить заявку</button>
            </form>
            {
                modalSended &&
                <Modal>
                    <Sended />
                </Modal>
            }
        </>
    )
}