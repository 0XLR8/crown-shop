import { useState } from 'react'
import { resetPassword } from '../firebase';

export const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [complete, setComplete] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try{
            await resetPassword(email);
            setLoading(false);
            setComplete(true);

        } catch(er) {
            console.log(er.message);
            setLoading(false)
            setError('There was an error. Please try again later.')
        }
    }

    return (
        <form className='register' onSubmit={handleSubmit}>
            <h1>Reset password</h1>
            <p>Enter your email to complete the reset process.</p>
            {error && <p className='error'>{error}</p>}
            {
                complete ?
                <p className='reset-complete'>A password reset link was sent to the address. Please check your inbox.</p>
                :
                <>
                    <input 
                    required
                    type='email' 
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <button disabled={loading}>Send</button>
                </>
            }
        </form>
  )
}
