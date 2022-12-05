export default function getStyles(state: { isValid: boolean; }): string[] {
    return [
        state.isValid ? 'border-gray-400' : 'border-[#ff4e4e]',
    ]
}