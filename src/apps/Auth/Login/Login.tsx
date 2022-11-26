import { useState } from 'react';
import { setLoginFormType } from '@/features/user/userSlice';
import { useAppDispatch } from '@/app/hooks';
import useAuth from '@/custom-hooks/useAuth';
import TextField from '@/components/ui/TextField';


export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useAuth();
    const dispatch = useAppDispatch();
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        login(username, password)
    }

    const handleForgotPassword = () => {
        dispatch(setLoginFormType('forgotPassword'));
    }
    return (
        <>
            <div className="text-center text-2xl">Login</div>
            <TextField className="mt-4" placeholder="Username" onChange={handleUsernameChange}></TextField>
            <TextField className="mt-4" placeholder="Password" type="password" onChange={handlePasswordChange}></TextField>
            <button type="button" className=" bg-blue-400 rounded px-3 py-2 mx-auto block mt-6" onClick={handleSubmit}>Submit</button>
            <div className="text-center mt-2 cursor-pointer" onClick={handleForgotPassword}>Forgot Password?</div>
        </>
    )
}
