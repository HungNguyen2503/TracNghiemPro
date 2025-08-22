import { useEffect, useState } from "react";
import IconTopics from "../../components/IconTopics";
import { getTopic } from "../../services/topicService";
import "./Home.scss";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BeatLoader  } from "react-spinners";
const NUMBER_TOPIC_POPULAR = 3;

const Home = ()=>{
  const [topicsPopular, setTopicsPopular] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const getRandomTopic = async ()=> {
      const topics = [];
      const numbers = [];

      while (numbers.length < NUMBER_TOPIC_POPULAR) {
        const numberRandom = Math.floor(Math.random() * 10) + 1;

        if (!numbers.includes(numberRandom)) {
          numbers.push(numberRandom);
          const res = await getTopic(numberRandom);
          if (!res) continue;
          topics.push(res);
        }
      }
      setTopicsPopular(topics);
      setIsLoading(false);
    }
    getRandomTopic();
  }, []);

  const handleTopicDetail = (topic)=>{
    navigate('/topic-detail', {state: topic});
  }

  const handleChallenge = ()=>{
    const numberRandom = Math.floor(Math.random() * NUMBER_TOPIC_POPULAR);
    navigate('/topic-detail', {state: topicsPopular[numberRandom]});
  }
  
  return(
    <section className="home">
      <div className="home__welcome">
        <h1>Welcome to Exam Pro</h1>
      </div>

      <div className="home__search">
        <input type="text" placeholder="Search..." className="home__input-search" />
        <span><IoMdSearch /></span>
      </div>
      
      <div className="home__popular-topics">
        <h2>Popular Topic</h2>
        <ul>
          { !isLoading ? topicsPopular.map((topic, index) => (
            <li key={index} className="home__topic-item" onClick={()=>handleTopicDetail(topic)}>
              <span className="home__topic-icon">
                <IconTopics iconName={topic.icon} />
              </span>
              <span className="home__topic-name">{topic.name}</span>
            </li>
          )) : <BeatLoader  color="#3B82F6" />}
        </ul>
      </div>
      <button className="home__random-challenge" onClick={handleChallenge}>
        Challenge
      </button>
    </section>
  );
}

export default Home;