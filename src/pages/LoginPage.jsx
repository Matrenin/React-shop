import '../components/formLogin/formLogin.scss'
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react";
import imgGoogleAuth from '../assets/googleIcon.png'
import FormLogin from "../components/formLogin/formLogin"

import { setUser } from "../store/auth/action";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { writeUserEmail, writeUserName, getUserValue } from '../services/firebase'
import Loader from '../ui/Loader';

const LoginPage = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = (e, email, password, rememberMe) => {
    e.preventDefault();
    setErrorMessage('')
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user
        getUserValue(user)
        .then((data) => {
          const dataUser = data

          dispatch(setUser({
            email: dataUser.email.email,
            id: user.uid,
            token: user.accessToken,
            name: dataUser.name?.name || null,
            phone: dataUser.phone?.phone || null,
            applications: dataUser?.applications || {},
            subscribe: dataUser.subscribe?.subscribe || null,
            comments: dataUser.comments?.comments || {},
              
          }));
          if (rememberMe === true) {
            localStorage.setItem('remember', true)
          }
      
        })
        .catch((error) => {
          console.error(error)
        })     
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
      .finally(()=> {
        setLoading(false)
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
        writeUserEmail(user)
        writeUserName(user)
        getUserValue(user)
          .then((data) => {
            const dataUser = data
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
      {loading && (
        <Loader /> 
      )}
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
              <NavLink className="formLogin__link" to='/signup'>Зарегистрироваться</NavLink>
            </div>
          </div>   
        </section>
      
    </>
  )
}

export default LoginPage