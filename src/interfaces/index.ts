import { CognitoUserPool, CognitoUserSession } from "amazon-cognito-identity-js"
import { FieldErrors } from "react-hook-form"

export interface Profile {
    UserAttributes: ProfileAttribute[]
}

export interface ProfileAttribute {
    Name: string
    Value: string
}

export interface IMenuItem {
    title: string
    icon?: string
    children: IMenuItem[]
}

export interface IMenuItemHeader {
    title: string
    children: IMenuItem[]
}

export interface IAMCredentials {
    AccessKeyId: string
    SecretAccessKey: string
    SessionToken: string
    Expiration: string
}

export interface User {
    userPool: CognitoUserPool;
    user?: CognitoUserSession;
    credentials: IAMCredentials;
    idToken: string;
}

export interface IIdToken {
    sub: string;
    email: string;
    "cognito:groups": string[];
    "cognito:username": string;
    "custom:created"?: string;
    exp: string
}

export interface ILoginFormTypes {
    type: 'login' | 'newPassword' | 'forgotPassword'
}

export interface INewPasswordHandler {
    handler: (newPassword: string) => void
}

export interface ITextField {
    icon?: string;
    placeholder?: string;
    name?: string;
    type?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, isValid: boolean) => void;
    rules?: ITextFieldInputRule[];
}

export interface ITextFieldInputRule {
    rule(arg0: string): boolean;
    message: string;
}

export interface IButton {
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
    text: string;
}
