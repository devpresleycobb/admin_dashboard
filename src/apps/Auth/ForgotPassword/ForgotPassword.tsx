import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectLoading, setLoginFormType } from '@/features/user/userSlice';
import useAuth from '@/custom-hooks/useAuth';
import { Typography, Input, Button } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import Error from '@/components/ui/Error';

export default function ForgotPassword() {
  const { handleSubmit, control, formState: { errors }, setValue, getValues } = useForm();
  const { forgotPassword } = useAuth();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading)
  const onSubmit = () => {
    const { Username } = getValues();
    forgotPassword(Username);
  }
  const handleUsernameChange = (e: any) => {
    setValue('Username', e.target.value);
  }
  const handleBackClick = () => {
    dispatch(setLoginFormType('login'));
  }

  return <>
    <Typography variant="h3" color="blue-gray" className="mb-5">
      Reset Password
    </Typography>
    <Typography color="gray" className="mb-16">
            Enter your email address and we'll send you a verification code
        </Typography>
    <form className="text-left max-w-[24rem] mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
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
      <Typography onClick={handleBackClick} as="a" color="blue" className="font-medium block ml-auto w-24 cursor-pointer">
          Back to login
      </Typography>
      <Button size="lg" type="submit" className="mt-6" fullWidth disabled={loading}>
        Reset Password Via Email
      </Button>
    </form>
  </>
}
