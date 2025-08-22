import { useLocation, useNavigate } from "react-router-dom";
import IconTopics  from "./../../components/IconTopics";
import "./TopicDetail.scss";
import { useState } from "react";

const TopicDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id:topicId,  name: topicName, icon: topicIcon } = location.state;
  const [numQuestions, setNumQuestions] = useState(5);
  const [level, setLevel] = useState("Easy");

  const handleStartQuiz = () => {

      navigate(`/test`, {state: {topicId: topicId, topicName: topicName, level: level, numQuestions: numQuestions}} )
  };

  return (
    <section className="topic-detail">
      <div className="topic-detail__container">
        <div className="topic-detail__header">
          <span><IconTopics iconName={topicIcon} /></span>
          <h3>{topicName}</h3>
        </div>

        <div className="topic-detail__options-wrapper">
          <div className="topic-detail__options">
            <h3>Customize the test</h3>

            <div className="topic-detail__option">
              <h4>Number of questions:</h4>
              <div className="topic-detail__buttons">
                {[5, 10, 40].map((num) => (
                  <button
                    key={num}
                    className={numQuestions === num ? "active" : ""}
                    onClick={() => setNumQuestions(num)}
                  >
                    {num} question
                  </button>
                ))}
              </div>
            </div>

            <div className="topic-detail__option">
              <h4>Level:</h4>
              <div className="topic-detail__buttons">
                {["Easy", "Medium", "Hard"].map((lvl) => (
                  <button
                    key={lvl}
                    className={level === lvl ? "active" : ""}
                    onClick={() => setLevel(lvl)}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
            <button className="topic-detail__start" onClick={handleStartQuiz}>
              Start the test
            </button>
          </div>
        </div>
      </div>
      <button className="topic-detail__back" onClick={() => navigate(-1)}>
        Back
      </button>
    </section>
  );
};

export default TopicDetail;
