import { Typography, Input, Button } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import Error from '@/components/ui/Error';
import { selectLoading, setLoginFormType } from "@/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import useAuth from "@/custom-hooks/useAuth";

export function Login() {
  const { handleSubmit, control, formState: { errors }, setValue, getValues } = useForm();
  const loading = useAppSelector(selectLoading)
  const dispatch = useAppDispatch();
  const { login } = useAuth();
  const onSubmit = () => {
    const { Username, Password } = getValues();
    login(Username, Password);
  }
  
  const handleUsernameChange = (e: any) => {
    setValue('Username', e.target.value);
  }
  const handlePasswordChange = (e: any) => {
    setValue('Password', e.target.value);
  }
  const handleForgotPasswordClick = () => {
    dispatch(setLoginFormType('forgotPassword'));
  }
  return <>
        <Typography variant="h3" color="blue-gray" className="mb-2">
            Welcome back
        </Typography>
        <Typography color="gray" className="mb-16">
            Welcome back, please enter your details.
        </Typography>
        <form className="text-left max-w-[24rem] mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8">
            <Controller
              name="Username"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              render={() => <Input onChange={handleUsernameChange} size="lg" label="Username" type="text" name="username" error={!!errors.Username} />}
            />
            <Error name="Username" errors={errors} />
          </div>
          <div className="mb-4">
            <Controller
              name="Password"
              control={control}
              rules={{ required: true }}
              render={() => <Input onChange={handlePasswordChange} size="lg" label="Password" type="password" name="password" error={!!errors.Password} />}
            />
            <Error name="Password" errors={errors} />
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Typography onClick={handleForgotPasswordClick} as="a" color="blue" className="font-medium ml-auto cursor-pointer">
              Forgot password
            </Typography>
          </div>
          <Button size="lg" type="submit" className="mt-6" fullWidth disabled={loading}>
            sign in
          </Button>
        </form>
        </>
}

export default Login;

