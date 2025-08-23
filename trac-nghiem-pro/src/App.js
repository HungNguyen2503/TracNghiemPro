import { useDispatch } from 'react-redux';
import './App.css';
import AllRoute from './components/AllRoute';
import { getAuthenticatedUser } from './services/userService';
import { LOGIN } from './actions/user';
import { getAllTopic } from './services/topicService';
import { ADD_ALL_TOPIC } from './actions/topic';
import { useEffect } from 'react';

function App() {
  // const [ ,value] = document.cookie.split("=");
  const dispatch = useDispatch();

  // const init = async ()=>{
  //   const user = await getAuthenticatedUser(value);
  //   const topics = await getAllTopic();
  //   dispatch(ADD_ALL_TOPIC(topics));
  //   dispatch(LOGIN(user));
  // }
  // init();

  useEffect(() => {
    const init = async () => {
      try {
        const cookies = document.cookie.split(';');
        let token = null;
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith("token=")) {
            token = cookie.substring("token=".length);
            break;
          }
        }
        
        const [user, topics] = await Promise.all([
          getAuthenticatedUser(token),
          getAllTopic()
        ]);
        
        if (user) {
          dispatch(LOGIN(user));
        }
        
        if (topics) {
          dispatch(ADD_ALL_TOPIC(topics));
        }
      } catch (error) {
        console.error("Failed to initialize app data", error);
      } finally {

      }
    };
    init();
  }, [dispatch]);
  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
