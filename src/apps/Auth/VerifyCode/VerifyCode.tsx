import { useState } from "react";
import TextField from "@/components/ui/TextField";
import useAuth from "@/custom-hooks/useAuth";

export default function VerifyCode() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");
  const { completeForgottenPasswordFlow } = useAuth();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLocalError('');
    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    if (code.length !== 6) {
      setLocalError('Code must be 6 characters');
      return;
    }
    completeForgottenPasswordFlow(code, newPassword);
    // submitNewPassword(newPassword);
  }
  const handleSetNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewPassword(e.target.value);
  }
  const handleSetConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  }
  const handleSetCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCode(e.target.value);
  }

  return (<>
    <div className="text-center text-2xl">Verify Code</div>
    <TextField className="mt-4" placeholder="Verification Code" onChange={handleSetCode}></TextField>
    <TextField className="mt-4" type="password" placeholder="New Password" onChange={handleSetNewPassword}></TextField>
    <TextField className="mt-4" type="password" placeholder="Confirm Password" onChange={handleSetConfirmPassword}></TextField>
    <div className="mt-3 text-center text-red-500">{localError}</div>
    <button className="block mx-auto bg-blue-400 rounded px-3 py-2 mt-6" onClick={handleSubmit}>Reset Password</button>
  </>
  )
}
