import { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Signin } from '../components/signin/Signin';
import { Signup } from '../components/signin/Signup';
import { Loader } from '../components/Loader';
import { useSelector } from 'react-redux';

const SignInText = 'Already have an account? Sign up instead.';
const SignUpText = 'You are not registered? Create an account.';

export const Register = () => {
    const {auth, authPending} = useSelector((state) => state.auth);
    const [isLogin, setIsLogin] = useState(true);
    const [URLSearchParams] = useSearchParams();

    if(authPending){
        return <Loader />
    }

    if(auth && URLSearchParams.get('redirect') === 'checkout'){
        return <Navigate to='/checkout' />
    }
    
    if(auth){
        return <Navigate to='/' />
    }

    return (
        <div className='register'>
            {
                isLogin ? <Signin /> : <Signup />
            }
            <p className='register-switch' onClick={() => setIsLogin(!isLogin)}>{isLogin ? SignInText : SignUpText}</p>
        </div>
    )
}
