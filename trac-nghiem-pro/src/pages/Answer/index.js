/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { IoPerson } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getUserAllAnswer } from "../../services/userAnswersService";
import { getAllTopic } from "../../services/topicService";
import "./Answer.scss";
import { formatDate } from "../../utils/formatDate";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import { MdSubject } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BeatLoader  } from "react-spinners";
const Answer = ()=>{
  const currentUser = useSelector(state => {
    return  state.userReducer
  });
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    (async()=>{
      const resTest = await getUserAllAnswer(currentUser?.id);
      const resTopic = await getAllTopic();

      const listTest = resTest.map( itemTest => {
        return {
          "id": itemTest.id,
          "topicId": itemTest.topicId,
          "topicName": resTopic.find(t => t.id === itemTest.topicId).name,
          "correct": [...itemTest?.answers].reduce((correct, a)=>(a.result ? ++correct : correct), 0),
          "incorrect": [...itemTest?.answers].reduce((incorrect, a)=>(a.result ? incorrect : ++incorrect), 0),
          "total": [...itemTest?.answers].length,
          "level": itemTest.level,
          "limit": itemTest.timeLimit,
          "submittedAt": itemTest.submittedAt
        }
      });
      setIsLoading(false);
      setItems(listTest);
    })();
  }, [currentUser])

  const handleTopic = (testId, topicId, topicName)=>{
    navigate("/answer-detail", {state:{"testId": testId, "topicId": topicId, "topicName": topicName}});
  }

  return(
    <section className="answer">
      <div className="answer__content">
        <h2 className="answer__header">List Test</h2>
        <ul className="answer__list">
          {!isLoading ? [...items].reverse().map((item)=>(
            <li key={item.id} className="answer__item" onClick={()=>handleTopic(item.id, item.topicId, item.topicName)}>
              <div className="item">
                <h3 className="item__topic-name"><span className="item__topic-icon"><MdSubject/></span>{item.topicName}</h3>
                <p className="item__correct"><span><BsCheckCircleFill /></span>Correct: {item.correct} /{item.total}</p>
                <p className="item__incorrect"><span><BsXCircleFill /></span>Incorrect: {item.incorrect} /{item.total}</p>
                <p className="item__limit">{item.limit/60}min</p>
                <p className="item__score"><span>{item.correct/item.total*10}/10</span></p>
                <p className="item__submittedAt">{formatDate(item.submittedAt)}</p>
                <span className={`item__level ${item.level==="Easy" ? "item__level--easy" : item.level==="Medium" ? "item__level--medium" : "item__level--hard"}`}></span>
              </div>
            </li>
          )) : <BeatLoader  color="#3B82F6" />}
        </ul>
      </div>
      <div className="answer__info">
        <div className="answer__info-content">
          <p className="answer__avatar"><IoPerson /></p>
          <p className="answer__fullname">{currentUser?.fullName || "Guest"}</p>
          <p className="answer__email">{currentUser?.email || "SAY HELLO"}</p>
        </div>

      </div>
    </section>
  );
}

export default Answer;