import { useEffect, useRef, useState } from "react";
import IconTopics from "../../components/IconTopics";
import { getTopic } from "../../services/topicService";
import "./Home.scss";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { convertToSlug } from "../../utils/convertToSlug";
const NUMBER_TOPIC_POPULAR = 3;

const Home = () => {
  // const 
  const allTopic = useSelector((state) => state.topicReducer);
  const [topicsPopular, setTopicsPopular] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [inputSearch, setInputSearch] = useState("");
  const [searchTopic, setSearchTopic] = useState([]);
  const inputSearchRef = useRef(null);
  const searchTopicRef = useRef(null);



  useEffect(() => {
    const getRandomTopic = async () => {
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
    };
    getRandomTopic();
  }, []);



  useEffect(() => {
    try {
      if(inputSearch === ""){
        setSearchTopic([]);
        return;
      } 
      const search = allTopic?.filter((topic) =>
        convertToSlug(topic.name.toLowerCase()).includes(
          convertToSlug(inputSearch.toLowerCase())
        )
      );
      setSearchTopic(search);
    } catch (error) {
      console.log(error);
    }
  }, [inputSearch, allTopic]);



  useEffect(() => {
    const currentInputSearchRef = inputSearchRef.current;
    function handleClickOutside(e) {
      if (inputSearchRef.current && !inputSearchRef.current.contains(e.target) && !searchTopicRef.current.contains(e.target)) {
        setInputSearch("");
      }
    }

    function handleSearchFocus(){
      setInputSearch(inputSearchRef.current.value);
    }

    document.addEventListener('mousedown', handleClickOutside);
    currentInputSearchRef.addEventListener('focus', handleSearchFocus);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      currentInputSearchRef.removeEventListener('focus', handleSearchFocus);
    };
  }, [inputSearchRef, searchTopicRef]);

  const handleSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const handleTopicDetail = (topic) => {
    navigate("/topic-detail", { state: topic });
  };

  const handleChallenge = () => {
    if (!topicsPopular.length) return;

    const numberRandom = Math.floor(Math.random() * NUMBER_TOPIC_POPULAR);
    navigate("/topic-detail", { state: topicsPopular[numberRandom] });
  };

  return (
    <section className="home">
      <div className="home__welcome">
        <h1>Welcome to Exam Pro</h1>
      </div>

      <div className="home__search">
        <input
          type="text"
          placeholder="Search..."
          className="home__input-search"
          onChange={handleSearch}
          ref={inputSearchRef}
        />
        <span>
          <IoMdSearch />
        </span>
        <div className={searchTopic.length ? "home__item-search home__item-search--active" : "home__item-search"} ref={searchTopicRef}>
          {searchTopic?.slice(0, 3).map((topic) => {
            return <p key={topic.id} onClick={() => handleTopicDetail(topic)} >{topic.name}</p>;
          }) ?? searchTopic.length}
        </div>
      </div>

      <div className="home__popular-topics">
        <h2>Popular Topic</h2>
        <ul>
          {!isLoading ? (
            topicsPopular.map((topic, index) => (
              <li
                key={index}
                className="home__topic-item"
                onClick={() => handleTopicDetail(topic)}
              >
                <span className="home__topic-icon">
                  <IconTopics iconName={topic.icon} />
                </span>
                <span className="home__topic-name">{topic.name}</span>
              </li>
            ))
          ) : (
            <BeatLoader color="#3B82F6" />
          )}
        </ul>
      </div>
      <button className="home__random-challenge" onClick={handleChallenge}>
        Challenge
      </button>
    </section>
  );
};

export default Home;
