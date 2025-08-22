/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { getAllTopic } from "../../services/topicService";
import IconTopics from "../../components/IconTopics";
import { pagination } from "../../utils/pagination";
import './Topic.scss';
import Pagination from "../../components/Pagination";
import { useSelector } from "react-redux";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BeatLoader  } from "react-spinners";

const ITEM_PER_PAGE = 3;

const Topic = ()=>{
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [page, setPage] = useState({});
  const currentUser = useSelector(state => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);
  // Fetch all topics when the component mounts
  useEffect(() => {
    const allTopics = async () => {
      const res = await getAllTopic();
      if (res) {
        setTopics(res);
        setPage(pagination(res, ITEM_PER_PAGE, 1));
        setIsLoading(false);
      }
    }
    allTopics();
  }, []);

  const handlePage = (currentPage)=>{
    setPage(pagination(topics, ITEM_PER_PAGE, currentPage));
  }

  const handleTopic = (topic)=>{
    navigate('/topic-detail', {state: topic});
  }
  return(
    <>
      <section className="topic">
        <div className="topic__content">
          <h2 className="topic__header">Topic List</h2>
          <ul className="topic__list">
            {!isLoading ? page.currentItems?.map((topic, index) => (
              <li key={index} className="topic__item">
                <span><IconTopics iconName={topic.icon}/></span>
                <h3>{topic.name}</h3>
                <button className="topic__test" onClick={()=>handleTopic(topic)}>Test</button>
              </li>
            )) : <BeatLoader  color="#3B82F6" />}
          </ul>

          <Pagination currentPage={page.currentPage} totalPages={page.totalPages} handlePage={handlePage}/>
        </div>
        <div className="topic__info">
          <div className="topic__info-content">
            <p className="topic__avatar"><IoPerson /></p>
            <p className="topic__fullname">{currentUser?.fullName || "Guest"}</p>
            <p className="topic__email">{currentUser?.email || "SAY HELLO"}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Topic;