import { useAppSelector } from '@/app/hooks';
import { selectLoginFormType } from '@/features/user/userSlice';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import NewPassword from './NewPassword';
import VerifyCode from './VerifyCode';

export default function Auth() {
    const formType = useAppSelector(selectLoginFormType);
    const formTypes = {
        'login': <Login></Login>,
        'verifyCode': <VerifyCode></VerifyCode>,
        'newPassword': <NewPassword></NewPassword>,
        'forgotPassword': <ForgotPassword></ForgotPassword>
    }
    return (
    <div className="h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="max-w-md mx-auto flex flex-col justify-center h-screen">
            <div className="rounded bg-white px-4 pt-4 pb-5">
                {formTypes[formType]}
            </div>
        </div>
    </div>
    )
}
