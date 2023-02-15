import { NavLink } from 'react-router-dom'

import style from './errorContent.module.css'


const ErrorContent = () => {
    return (
      <>
        <div className={style.wrp}>
          <h1 className={style.title}>404</h1>
          <p className={style.subtitle}>Что-то пошло не&nbsp;так! Страница, которую вы&nbsp;запрашиваете, не&nbsp;существует. Возможно она устарела, была удалена, или был заведён неверный адрес в&nbsp;адресной строке.</p>
          <NavLink to="/" className={style.btn}> Перейти на главную </NavLink>
        </div>
      </>
    )
  }
  
  export default ErrorContent