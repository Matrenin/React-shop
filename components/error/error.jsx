import { NavLink } from 'react-router-dom'

import './error.scss'


const ErrorContent = () => {
    return (
      <>
        <div className='error'>
          <h1 className='error__title'>404</h1>
          <p className='error__subtitle'>Что-то пошло не&nbsp;так! Страница, которую вы&nbsp;запрашиваете, не&nbsp;существует. Возможно она устарела, была удалена, или был заведён неверный адрес в&nbsp;адресной строке.</p>
          <NavLink to="/" className='error__btn'> Перейти на главную </NavLink>
        </div>
      </>
    )
  }
  
  export default ErrorContent