import '../components/formLogin/formLogin.scss'
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react";
import imgGoogleAuth from '../assets/googleIcon.png'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { writeUserEmail, writeUserName, getUserValue } from '../services/firebase'
import { setUser } from "../store/auth/action";

import FormLogin from "../components/formLogin/formLogin"
import Loader from '../ui/Loader';

const SignUpPage = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = (e, email, password) => {
    e.preventDefault();
    setErrorMessage('')
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user
        console.log(`${user.email} зарегестрирован`)
        navigate('/login')
        writeUserEmail(user);
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

      })
      .finally(()=> {
        setLoading(false)
        console.log('Конец загрузки')
      }
      )
  }

  const handleSubmitGoogle = (e) => {
    e.preventDefault()
    setErrorMessage('');
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {

        const user = result.user;

        getUserValue(user)
          .then((data) => {
            const dataUser = data
            console.log(dataUser)
            dispatch(setUser({
              email: dataUser.email.email,
              id: user.uid,
              token: user.accessToken,
              name: dataUser.name?.name || null,
              phone: dataUser.phone?.phone || null,
              applications: dataUser?.applications || {},
              subscribe: dataUser.subscribe?.subscribe || null,
              comments: dataUser?.comments || {},      
            }));
          })
          .catch((error) => {
            console.error(error)
          })
        navigate('/account');
        localStorage.setItem('remember', true); 
        writeUserEmail(user)
        writeUserName(user)
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
      {loading && (
       <Loader />
      )}
      <section className="formLogin container">
        {errorMessage ?
          <div className="formLogin__error">
            {errorMessage}
          </div> : <h1>Регистрация</h1>}
        <div className="formLogin__box">
          <FormLogin
            title='Зарегистрироваться'
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