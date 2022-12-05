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
        <section className="grid lg:grid-cols-2 items-center h-screen">
            <div className="p-8 sm:p-10 md:p-20 xl:px-32 xl:py-24 text-center my-auto">
                {formTypes[formType]}
            </div>
            <img
            src="https://images.unsplash.com/photo-1613125700782-8394bec3e89d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW91bmF0aW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt="background image"
            className="w-full h-screen object-cover hidden lg:block"
            />
        </section>
    )
}
