import { useGetTestMutation } from "@/services/users"
import jwtDecode from "jwt-decode"
import { useEffect } from "react"
import { useAppSelector } from "@/app/hooks"
import { selectIdToken } from "@/features/user/userSlice"
import { IIdToken } from "@/interfaces"
import useAuth from "@/custom-hooks/useAuth"
import { Card, CardHeader, CardBody, Typography, CardFooter } from "@material-tailwind/react"

export default function Home() {
  const idToken = useAppSelector(selectIdToken);
  useEffect(() => {
    if(idToken) {
      const properties: IIdToken = jwtDecode(idToken)
      if(properties['custom:created']) return
    }
  }, [])


  return <>Home Content</>
}
