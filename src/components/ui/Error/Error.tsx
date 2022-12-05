import { FieldErrors } from 'react-hook-form'

export default function Error({ errors, name }: { errors: FieldErrors, name: string }) {

    if (errors[name]?.type === 'required') {
        return <span className="text-[#F44336]">This field is required</span>
    }
    const error = errors[name]?.message?.toString();
    return <span className="text-[#F44336]">{error}</span>
}
