import { useSelector } from "react-redux";
import "./AnswerDetail.scss";
import { IoPerson } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserAnswer } from "../../services/userAnswersService";
import { getQuestionsTopic } from "../../services/questionService";
import { FaRegCheckSquare } from "react-icons/fa";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { formatDate } from "../../utils/formatDate";
import { BeatLoader } from "react-spinners";

const AnswerDetail = () => {
  const currentUser = useSelector((state) => state.userReducer);
  const location = useLocation();
  const { testId, topicId, topicName } = location.state;
  const [items, setItems] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const resTest = await getUserAnswer(testId);
      const resQuestions = await getQuestionsTopic(topicId);
      const { answers, ...infoTest } = resTest;

      const numCorrect = answers.reduce(
        (correct, answer) => (answer.result ? ++correct : correct),
        0
      );

      const newAnswers = answers.map((item) => {
        const findQuestion = resQuestions.find((rq) => rq.id === item.id);
        return {
          id: item?.id,
          select: item?.select,
          result: item?.result,
          question: findQuestion?.question,
          options: findQuestion?.options,
          correctAnswer: findQuestion?.correctAnswer,
        };
      });

      setItems({
        ...infoTest,
        topicName: topicName,
        answers: newAnswers,
        correct: numCorrect,
      });
      setIsLoading(false);
    })();
  }, [testId, topicId, topicName]);

  const handleQuestion = (num) => {
    setCurrentQuestion(num);
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((num) => num - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < items?.numQuestions) {
      setCurrentQuestion((num) => num + 1);
    }
  };

  return (
    <section className="answer-detail">
      <div className="answer-detail__content">
        <div className="answer-detail__reported">
          <div>
            <div className="summary-info">
              <p>
                <strong>Topic {items?.topicId}:</strong> {items?.topicName}
              </p>
              <p>
                <strong>Level:</strong> {items?.level}
              </p>
              <p>
                <strong>Limit:</strong> {items?.timeLimit / 60}min
              </p>
            </div>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Total</th>
                  <th>Correct</th>
                  <th>Incorrect</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{items?.numQuestions}</td>
                  <td>{items?.correct}</td>
                  <td>{items?.numQuestions - items?.correct}</td>
                </tr>
                <tr>
                  <td>At</td>
                  <td colSpan={2}>{formatDate(items?.submittedAt)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div className="score">
              <span>{(10 * items?.correct) / items?.numQuestions} /10</span>
            </div>
          </div>
        </div>
        {
          !isLoading ? 
          <div className="answer-detail__completed">
            <div className="answer-detail__filed">
              <p className="answer-detail__question">
                Question {currentQuestion + 1}
              </p>
              {
                <p className="answer-detail__question-detail">
                  <span>{items?.answers?.[currentQuestion].question}</span>

                  {items?.answers?.[currentQuestion]?.select ===
                  items?.answers?.[currentQuestion]?.correctAnswer ? (
                    <span className="answer-detail__icon answer-detail__icon--correct">
                      <FaRegCheckSquare />
                      Đúng
                    </span>
                  ) : (
                    <span className="answer-detail__icon answer-detail__icon--incorrect">
                      <AiOutlineCloseSquare />
                      Sai
                    </span>
                  )}
                </p>
                ?? !isLoading
              }

              <div className="answer-detail__choice">
                {
                  items?.answers?.[currentQuestion]?.options?.map(
                    (option, index) => (
                      <p key={index}>
                        <label
                          htmlFor={index}
                          className={`${
                            index === items?.answers?.[currentQuestion]?.select
                              ? "answer-detail__label answer-detail__label--active"
                              : "answer-detail__label"
                          } ${
                            index ===
                            items?.answers[currentQuestion]?.correctAnswer
                              ? "answer-detail__label--correct"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            className="test__radio"
                            name="test"
                            id={index}
                            value={index}
                            hidden
                          />
                          {String.fromCharCode(65 + index)}
                        </label>
                        <span>{option}</span>
                      </p>
                    )
                  )
                  ?? !isLoading
                }
              </div>
            </div>
            <div className="answer-detail__control">
              <span className="answer-detail__prev" onClick={handlePrevQuestion}>
                Prev
              </span>
              <span className="answer-detail__next" onClick={handleNextQuestion}>
                Next
              </span>
            </div>
          </div>
          : <BeatLoader  color="#3B82F6" />
        }
      </div>

      <div className="answer-detail__info">
        <div className="answer-detail__info-content">
          <p className="answer-detail__avatar">
            <IoPerson />
          </p>
          <p className="answer-detail__fullname">
            {currentUser?.fullName || "Guest"}
          </p>
          <p className="answer-detail__email">
            {currentUser?.email || "SAY HELLO"}
          </p>
        </div>

        <div className="answer-detail__number">
          {
            <ul className="answer-detail__list">
              {Array.from({ length: items?.numQuestions }).map((_, index) => (
                <li
                key={index}
                className={
                  items?.answers?.[index]?.select ===
                  items?.answers?.[index]?.correctAnswer
                    ? "answer-detail__item answer-detail__item--active"
                    : "answer-detail__item"
                }
                onClick={() => handleQuestion(index)}
                >
                  <span>{index + 1}</span>
                </li>))}
            </ul>
            ?? !isLoading
          }
        </div>
      </div>
    </section>
  );
};

export default AnswerDetail;
