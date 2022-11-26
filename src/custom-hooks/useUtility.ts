export default function useUtility() {
    const isValidEmail = (email: string) => {
        return !!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }
    return {
        isValidEmail
    }
}