import { Typography, Input, Button } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import Error from '@/components/ui/Error';
import { selectLoading } from "@/features/user/userSlice";
import { useAppSelector } from "@/app/hooks";
import useAuth from "@/custom-hooks/useAuth";

export function NewPassword() {
  const { handleSubmit, control, formState: { errors }, setValue, getValues } = useForm();
  const loading = useAppSelector(selectLoading)
  const { submitNewPassword  } = useAuth();

  const onSubmit = () => {
    const { ConfirmPassword } = getValues();
    submitNewPassword(ConfirmPassword);
  }
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('ConfirmPassword', e.target.value);
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('Password', e.target.value);
  }
  return <>
          <Typography variant="h3" color="blue-gray" className="mb-2">
            Reset Password
          </Typography>
          <Typography color="gray" className="mb-16">
            Set a new password
          </Typography>
          <form className="text-left max-w-[24rem] mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <Controller
                name="Password"
                control={control}
                rules={{
                  required: true
                }}
                render={() => <Input onChange={handlePasswordChange} size="lg" label="Password" type="password" name="password" error={!!errors.Password} />}
              />
              <Error name="Password" errors={errors} />
            </div>
            <div className="mb-4">
              <Controller
                name="ConfirmPassword"
                control={control}
                rules={{ 
                  required: true,
                  validate: (value) => value === getValues('Password') || "Passwords don't match" 
                }}
                render={() => <Input onChange={handleConfirmPasswordChange} size="lg" label="Confirm Password" type="password" name="confirm-password" error={!!errors.ConfirmPassword} />}
              />
              <Error name="ConfirmPassword" errors={errors} />
            </div>
            <Button size="lg" type="submit" className="mt-6" fullWidth disabled={loading}>
              Reset Password
            </Button>
          </form>
        </>
}

export default NewPassword;
