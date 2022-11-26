import Routes from '@/routes';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setLoggedIn, selectLoggedIn } from '@/features/user/userSlice';
import { useEffect, useState } from 'react';
import useAuth from './custom-hooks/useAuth';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(selectLoggedIn);
  const { attemptLogin } = useAuth();

  useEffect(() => {
    setLoading(true);
    attemptLogin().then((loggedIn) => {
        dispatch(setLoggedIn(loggedIn));
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      })
  }, []);
  return loading ? <div>Loading...</div> : <Routes loggedIn={loggedIn} />

}

export default App;
