import { useGetTestMutation } from "@/services/users"
import jwtDecode from "jwt-decode"
import { useEffect } from "react"
import { useAppSelector } from "@/app/hooks"
import { selectIdToken } from "@/features/user/userSlice"
import { IIdToken } from "@/interfaces"
import useAuth from "@/custom-hooks/useAuth"

export default function Home() {
  const [test] = useGetTestMutation()
  const idToken = useAppSelector(selectIdToken);
  const {logout} = useAuth();
  useEffect(() => {
    if(idToken) {
      const properties: IIdToken = jwtDecode(idToken)
      if(properties['custom:created']) return
    }
  }, [])
  const handleclick = async () => {
    const res = await test()
    console.log(res)
  }

  return <>
    <div>Home Content Here</div>
    <button onClick={logout}>LOGOUT</button>
    <button onClick={handleclick}>Button here</button>
    </>
}
