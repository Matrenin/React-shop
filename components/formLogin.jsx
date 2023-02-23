import { useState } from 'react';

const FormLogin = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <form>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="password"
            />

            <button
                onClick={(e) => {
                    handleClick(e, email, pass);
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