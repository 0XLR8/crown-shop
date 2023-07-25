import {useState} from 'react'
import { addUser, signUpUserWithEmailAndPassword } from '../../firebase';
import { formatError } from '../../utils/utils';

export const Signup = () => {
    const [signup, setSignup] = useState({
        email: '',
        displayName: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {email, password, displayName, confirmPassword} = signup;

    const handleSignupChange = (e) => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(password !== confirmPassword){
            setError('Passwords must match.');
            setLoading(false);
            return;
        }

        try{
            const {user} = await signUpUserWithEmailAndPassword(email, password);
            await addUser(user.uid, {
                email,
                displayName
            })
            setLoading(false);
            
        } catch(er) {
            setError(formatError(er.message));
            console.log(er.message);
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Sign up</h1>
            <p>Complete the form below to sign up.</p>
            {error && <p className='error'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    name='displayName' 
                    required
                    placeholder='Display Name'
                    value={displayName}
                    onChange={handleSignupChange}
                />
                <input 
                    type='email' 
                    name='email' 
                    required
                    placeholder='Email'
                    value={email}
                    onChange={handleSignupChange}
                />
                <input 
                    type='password' 
                    name='password' 
                    required
                    placeholder='Password'
                    value={password}
                    onChange={handleSignupChange}
                />
                <input 
                    type='password'
                    name='confirmPassword'
                    required
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={handleSignupChange}
                />
                <button disabled={loading}>Sign up</button>
            </form>
        </div>
    )
}
