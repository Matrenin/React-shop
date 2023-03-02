import { useEffect, useState } from 'react';

const FormLogin = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [remember, setRemember] = useState('');
    const [emailPress, setEmailPress] = useState(false);
    const [passPress, setPassPress] = useState(false);
    const [emailError, setEmailError] = useState('E-mail не может быть пустым');
    const [passError, setPassError] = useState('Пароль не может быть пустым');
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if(emailError || passError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passError])

    const blurHandler = (e) => {
        // eslint-disable-next-line default-case
        switch (e.target.name) {
            case 'email':
                setEmailPress(true)
                break
            case 'password':
                setPassPress(true)
                break
        }
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный e-mail')
        } else {
            setEmailError('')
        }
    }

    const passHandler = (e) => {
        setPass(e.target.value)
        console.log()
        if (e.target.value.length < 6) {
            setPassError('Пароль должен содержать не менее 6 символов')
        } else {
            setPassError('')
        }
    }

    return (
        <form>
            <input
                type="email"
                value={email}
                name='email'
                onChange={emailHandler}
                onBlur={e => blurHandler(e)}
                placeholder="Email"
            />
            {emailPress && emailError ?
                <p>{emailError}</p> : null
            }
            <input
                type="password"
                name='password'
                value={pass}
                onChange={passHandler}
                onBlur={e => blurHandler(e)}
                placeholder="Password"
            />
            {passPress && passError ?
                <p>{passError}</p> : null
            }
             {title === 'Войти'?
            <div className="formLogin__checkbox">
                <input 
                    type="checkbox" 
                    id="formLogin-saveMe"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="formLogin-saveMe">Запомнить меня</label>
            </div> : null
            }

            <button
                className="formLogin__btn-enter-exit"
                disabled={!formValid}
                onClick={(e) => {
                    handleClick(e, email, pass, remember);
                    setEmail('');
                    setPass('');
                }}
            >
                {title}
            </button>
        </form>
    )
}

export default FormLogin;