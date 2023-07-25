import {useState} from 'react'
import { signInUser } from '../../firebase';
import { formatError } from '../../utils/utils';
import { Link } from 'react-router-dom';

export const Signin = () => {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {email, password} = login;

    const handleLoginChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            await signInUser(email, password);
        } catch(er) {
            console.log(er.message);
            setError(formatError(er.message));
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Log in</h1>
            <p>Enter your email and password to log in.</p>
            {error && <p className='error'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type='email' 
                    name='email' 
                    required
                    placeholder='Email'
                    value={email}
                    onChange={handleLoginChange}
                />
                <input 
                    type='password'
                    name='password'
                    required
                    placeholder='Password'
                    value={password}
                    onChange={handleLoginChange}
                />
                <Link to='reset' className='forgot-password'>Forgot password?</Link>
                <button disabled={loading}>Login</button>
            </form>
        </div>
    )
}
