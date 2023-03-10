import '../components/formLogin/formLogin.scss'
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react";
import imgGoogleAuth from '../assets/googleIcon.png'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setUser } from "../store/auth/action";

import FormLogin from "../components/formLogin/formLogin"



const SignUpPage = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = (e, email, password) => {
    e.preventDefault();
    setErrorMessage('')
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user
        console.log(`${user.email} зарегестрирован`)
        navigate('/login')

      })
      .catch((error) => {

        switch (error.code) {
          case "auth/weak-password":
            setErrorMessage("Пароль должен состоять как минимум из 6 символов");
            break;
          case "auth/email-already-in-use":
            setErrorMessage(
              "Указанный e-mail уже зарегестрирован"
            );
            break;
          case "auth/invalid-email":
            setErrorMessage("Адрес электронной почты указан некорректно");
            break;
          case "auth/operation-not-allowed":
            setErrorMessage("Аккаунт заблокирован");
            break;
          default:
            setErrorMessage(error.message);
            break;
        }

      });
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
        localStorage.setItem('remember', true);
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
          </div> : <h1>Регистрация</h1>}
        <div className="formLogin__box">
          <FormLogin
            title='Зарегестрироваться'
            handleClick={handleRegister}
          />
          <button
            onClick={handleSubmitGoogle}
            className="formLogin__googleAuth"
          >
            <img src={imgGoogleAuth} alt="google icon" />
            <p>Войти с помощью Google</p>
          </button>
          <div>
            <p className="formLogin__question">Уже есть учётная запись?</p>
            <NavLink className="formLogin__link" to='/login'>Войти</NavLink>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUpPage