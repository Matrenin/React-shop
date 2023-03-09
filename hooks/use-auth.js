import { useSelector } from 'react-redux';
import { selectUser } from '../store/auth/selector';

export function useAuth() {
    const {email, token, id, name} = useSelector(selectUser);

    return {
        isAuth: !!email,
        email,
        token,
        id,
        name
    };
}