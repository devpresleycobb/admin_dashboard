// @ts-nocheck - may need to be at the start of file
import { ProfileAttribute } from '@/interfaces';
import { useAppSelector } from '@/app/hooks';
import { selectUserPool } from '@/features/user/userSlice';
import jwt_decode from "jwt-decode";
import { CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js';

export default function Avatar() {
  // const profileQuery = useGetProfileQuery();
  // const profileMutation = useUpdateProfileMutation();
  // const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  // if(profileQuery.isLoading) return <div>Loading...</div>
  // if(profileQuery.isError) return <div>Error</div>
  // const profile = profileQuery.data?.UserAttributes.find((attribute: ProfileAttribute) => attribute.Name === 'picture')
  // const user = useAppSelector(selectUser);
  // pool.getCurrentUser()?.getUserAttributes(user, (err: Error | null, attributes: CognitoUserAttribute[]) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log(attributes);
  // })

  // const foo = ?.getSession((err : Error | null, session: CognitoUserSession) => {
  //   if (err) return;
  //   const token = session.getIdToken().getJwtToken();
  //   const decoded = jwt_decode(token);
  //   console.log('session', decoded);
  // })
  // console.log('wtf')
  // if(user) {
  //   // const test = jwt_decode(user);
  //   console.log(user);
  // }
  
  // const handleClick = () => {
  //   const _profile = [
  //     {
  //       "Name": "picture",
  //       "Value": "https://ca.slack-edge.com/T06SXTRHQ-U01EFMWALBU-3eadb615c342-512"
  //     }
  //   ]
  //   updateProfile(_profile)
  // }
  return <>
    <div>hello</div>
    {/* <div className="w-10 rounded-full overflow-hidden ml-auto">
        <img src={profile?.Value} alt="avatar"/>
    </div>
    <button onClick={handleClick}>HELLO</button> */}
  </>
}
