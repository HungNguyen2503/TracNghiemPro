import { useDispatch } from 'react-redux';
import './App.css';
import AllRoute from './components/AllRoute';
import { getAuthenticatedUser } from './services/userService';
import { LOGIN } from './actions/user';
import { getAllTopic } from './services/topicService';
import { ADD_ALL_TOPIC } from './actions/topic';

function App() {
  const [ ,value] = document.cookie.split("=");
  const dispatch = useDispatch();

  const init = async ()=>{
    const user = await getAuthenticatedUser(value);
    const topics = await getAllTopic();
    dispatch(LOGIN(user));
    dispatch(ADD_ALL_TOPIC(topics));
  }
  init();
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
