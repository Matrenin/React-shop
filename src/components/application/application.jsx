import './application.scss'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'
import { addApplication } from '../../store/applications/actions'
import { closeModal, openModalSended } from '../../store/modal/actions'
import { Modal } from '../modal/modal'
import Sended from '../sended/Sended'

export function Application() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [commit, setCommit] = useState('')
    const [errorName, setErrorName] = useState(false)
    const [errorPhone, setErrorPhone] = useState(false)
    const [agree, setAgree] = useState(false)
    const idApplication = nanoid()
    const modalSended = useSelector(store => store.modal.modalSended)
    const dispatch = useDispatch()
    const handleSubmit = event => {
        event.preventDefault()
        if (!errorName || !errorPhone || phone || name || agree) {
            let applicationObj = {
                [idApplication]: {
                    name,
                    phone,
                    commit
                }
            }
            dispatch(addApplication(applicationObj))
            setName('')
            setPhone('')
            setCommit('')
            dispatch(closeModal(false))
            dispatch(openModalSended(true))
        } else {
            return
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
    return (
        <>
            <form className='application' onSubmit={(event) => handleSubmit(event)}>
                <div className='application__head'>
                    <h2 className='application__head__title' >Отправьте заявку</h2>
                    <p className='application__head__subtitle' >Мы свяжемся с Вами в ближайшее время</p>
                </div>
                {errorName ? <input className='application__input_false' type='text'
                    placeholder='Имя кирилицей'
                    required
                    value={name}
                    onChange={checkName}
                ></input> :
                    <input className='application__input' type='text'
                        placeholder='Имя'
                        required
                        value={name}
                        onChange={checkName}
                    ></input>
                }
                {errorPhone ? <input
                    className='application__input_false'
                    type='tel'
                    placeholder='Телефон'
                    required
                    value={phone}
                    onChange={checkPhone}
                ></input> :
                    <input
                        className='application__input'
                        type='tel'
                        placeholder='Телефон'
                        required
                        value={phone}
                        onChange={checkPhone}
                    ></input>
                }
                <textarea
                    className='application__input'
                    placeholder="Комментарий"
                    rows={5}
                    value={commit}
                    onChange={(event) => setCommit(event.target.value)}
                ></textarea>
                <label className='application__checkbox' ><input className='application__checkbox__input' type='checkbox'  ></input>
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