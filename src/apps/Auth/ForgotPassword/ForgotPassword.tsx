import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectLoading, selectLoginError, setLoginFormType } from '@/features/user/userSlice';
import useAuth from '@/custom-hooks/useAuth';
import useUtility from '@/custom-hooks/useUtility';
import TextField from '@/components/ui/TextField';

export default function ForgotPassword() {
  const [username, setUsername] = useState<string>('');
  const [localError, setLocalError] = useState<string>('');
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const { forgotPassword } = useAuth();
  const { isValidEmail } = useUtility();
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!isValidEmail(username)) {
      setLocalError('Invalid email');
      return;
    }
    forgotPassword(username);
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }
  const handleBackToLoginClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    dispatch(setLoginFormType('login'));
}
  return <div>
          <div className="text-center text-2xl">Forgot Password</div>
          <TextField placeholder="Email Address" className="mt-4" onChange={handleEmailChange}></TextField>
          <div className="mt-3 text-center text-red-500">{localError ?? error}</div>
          <button className="block mx-auto bg-blue-400 rounded px-3 py-2 mt-6" onClick={handleSubmit}>Reset Password</button>
          <div className="cursor-pointer" onClick={handleBackToLoginClick}>Back to signIn</div>
        </div>
}
