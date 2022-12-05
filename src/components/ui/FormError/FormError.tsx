export default function FormError({children}: {children: React.ReactNode}) {
  return (
    <div className="mt-1 text-center text-red-500">{children}</div>
  )
}
