import Cookies from 'js-cookie';

export default function Auth() {
  try {
    const [idToken, accessToken] = window.location.href.split('#')[1].split('&').map(item => item.split('=')[1])
    Cookies.set('idToken', idToken, { secure: true })
    Cookies.set('accessToken', accessToken, { secure: true })
    return (
      <>
      <div>ID TOKEN: {idToken}</div>
      <div>ACCESS TOKEN: {accessToken}</div>
      </>
    )
  } catch (error) {
    window.location.href = 'https://admindashboard.auth.us-east-1.amazoncognito.com/login?client_id=2aqdtv4khat0dtnui33vh9qc2t&response_type=token&scope=email+openid+phone+profile&redirect_uri=http://localhost:3000/auth';
    return (
      <>
      <div>YOU SHOULDNT BE HERE</div>
      </>
    )
  }
}
