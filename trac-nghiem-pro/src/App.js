import { useDispatch } from 'react-redux';
import './App.css';
import AllRoute from './components/AllRoute';
import { getAuthenticatedUser } from './services/userService';
import { LOGIN } from './actions/user';

function App() {
  const [ ,value] = document.cookie.split("=");
  const dispatch = useDispatch();

  const checkToken = async ()=>{
    const user = await getAuthenticatedUser(value);
    dispatch(LOGIN(user));
  }
  checkToken()
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
