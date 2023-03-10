import '../components/formLogin/formLogin.scss'
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react";
import imgGoogleAuth from '../assets/googleIcon.png'
import FormLogin from "../components/formLogin/formLogin"

import { setUser } from "../store/auth/action";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const LoginPage = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = (e, email, password, rememberMe) => {
    e.preventDefault();
    setErrorMessage('')
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user

        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
          name: null,
          rememberMe: rememberMe
        }));

        if (rememberMe === true) {
          localStorage.setItem('remember', true)
        }
      })
      .catch((error) => {

        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage("Адрес электронной почты указан некорректно!");
            break;
          case "auth/user-disabled":
            setErrorMessage(
              "Аккаунт заблокирован!"
            );
            break;
          case "auth/user-not-found":
            setErrorMessage("Адрес электронной почты не зарегестрирован!");
            break;
          case "auth/wrong-password":
            setErrorMessage("Пароль недействителен или у пользователя нет пароля!")
            break;
          default:
            setErrorMessage(error.message);
            break;
        }
      })
  }

  const handleSubmitGoogle = (e) => {
    e.preventDefault()
    setErrorMessage('');
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {

        const user = result.user;

        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
          name: user.displayName
        }));
        navigate('/account');
        localStorage.setItem('remember', true)
      })
      .catch((error) => {

        switch (error.code) {
          case "auth/user-disabled":
            setErrorMessage(
              "Аккаунт заблокирован"
            );
            break;
          default:
            setErrorMessage(error.message);
            break;
        }
      });
  }

  return (
    <>
      <section className="formLogin container">
        {errorMessage ?
          <div className="formLogin__error">
            {errorMessage}
          </div> : <h1>Войти</h1>}
        <div className="formLogin__box">
          <FormLogin
            handleClick={handleLogin}
            title='Войти'
          />
          <button
            onClick={handleSubmitGoogle}
            className="formLogin__googleAuth"
          >
            <img src={imgGoogleAuth} alt="google icon" />
            <p>Войти с помощью Google</p>
          </button>
          <div>
            <p className="formLogin__question">Нет учётной записи?</p>
            <NavLink className="formLogin__link" to='/signup'>Зарегестрироваться</NavLink>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoginPage