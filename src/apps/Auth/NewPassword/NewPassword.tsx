import React, { useState } from "react";
import { INewPasswordHandler } from "@/interfaces";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { selectLoading, selectNewPasswordError, setLoginFormType } from "@/features/user/userSlice";
import useAuth from "@/custom-hooks/useAuth";
import TextField from "@/components/ui/TextField";

export default function NewPassword() {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [localError, setLocalError] = useState<string>('');
    const error = useAppSelector(selectNewPasswordError);
    const loading = useAppSelector(selectLoading)
    const dispatch = useAppDispatch();
    const { submitNewPassword } = useAuth();

    const handleBackToLoginClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        dispatch(setLoginFormType('login'));
    }
    const handleSetNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewPassword(e.target.value);
    }
    const handleSetConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setConfirmPassword(e.target.value);
    }
    const handleSetPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        setLocalError('');
        if (newPassword !== confirmPassword) {
            setLocalError('Passwords do not match');
            return;
        }
        submitNewPassword(newPassword);
    }
    return <div>
        <div className="text-center text-2xl">New Password</div>
        <TextField className="mt-4" placeholder="New Password" type="password" onChange={handleSetNewPassword}></TextField>
        <TextField className="mt-4" placeholder="Confirm Password" type="password" onChange={handleSetConfirmPassword}></TextField>
        <div className="mt-3 text-center text-red-500">{localError ?? error}</div>
        <button className="block mx-auto bg-blue-400 rounded px-3 py-2 mt-6" onClick={handleSetPassword}>Set New Password</button>
        <div className="cursor-pointer" onClick={handleBackToLoginClick}>Back to signIn</div>
            </div>;
}
