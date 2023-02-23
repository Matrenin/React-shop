import './application.scss'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux'
import { addApplication } from '../../store/applications/actions'
import { closeModal, openModalSended } from '../../store/modal/actions'
import { Modal } from '../modal/modal'
import Sended from '../sended/Sended'

export function Application () {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [commit, setCommit] = useState('')
    const idApplication = nanoid()
    const modalSended = useSelector(store => store.modal.modalSended)

    const dispatch = useDispatch()
    
    const handleSubmit = event => {
        event.preventDefault()
        if (name !== '' &&  phone !== '') {
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

    return (
       <>
            <form className='application' onSubmit={(event) => handleSubmit(event)}>
                <div className='application__head'>
                    <h2 className='application__head__title' >Отправьте заявку</h2>
                    <p className='application__head__subtitle' >Мы свяжемся с Вами в ближайшее время</p>
                </div>
                <input
                    className='application__input'
                    type='text'
                    placeholder='Имя' 
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                ></input>
                <input
                    className='application__input'
                    type='tel'
                    placeholder='Телефон'
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                ></input>
                
                <textarea
                    className='application__input'
                    placeholder="Комментарий"
                    rows={5}
                    value={commit}
                    onChange={(event) => setCommit(event.target.value)}
                ></textarea>

                <label className='application__checkbox' ><input className='application__checkbox__input}=' type='checkbox' ></input>
                Отправляя заявку Вы соглашаетесь на обработку <span>персональных данных</span></label>

                <button className='application__btn' type='submit'>Отправить заявку</button>
            </form>
            {
                modalSended &&
                <Modal>
                    <Sended/>
                </Modal>
            }
       </> 
    )
}