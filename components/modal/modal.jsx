import './modal.scss'
import { useDispatch } from 'react-redux'
import { closeModal, closeModalDetail, closeModalSended } from '../../store/modal/actions'

export function Modal ({ children }) {
    const dispatch = useDispatch()

    const handleCloseModal = () => {
        dispatch(closeModal(false))
        dispatch(closeModalDetail(false))
        dispatch(closeModalSended(false))
    }

    return (
        <>
            <div className="modal" onClick={handleCloseModal}>
               <div onClick={e => e.stopPropagation()}>
                    {children}
               </div>
            </div>
        </>
    )
}
