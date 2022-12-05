export const isNonEmptyString = (value: string) => {
    return !!value || value.length > 0;
}

export const isValidEmail = (email: string) => {
    return !!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export const isValidPassword = (password: string) => {
    return !!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(password)
}