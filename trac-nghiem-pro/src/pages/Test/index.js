/* eslint-disable react-hooks/exhaustive-deps */
import { IoPerson } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestionsTopic } from "../../services/questionService";
import CountdownTimer from "../../components/CountdownTimer";
import { TiTick } from "react-icons/ti";
import { postUserAnswer } from "../../services/userAnswersService";
import Swal from 'sweetalert2'
import "./Test.scss";

const Test = () => {
  const timeLimits = {
    "Easy": 90,   
    "Medium": 60,   
    "Hard": 30 
  };

  const currentUser = useSelector((state) => state.userReducer);
  const location = useLocation();
  const { topicId, topicName, level, numQuestions } = location.state;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [endTest, setEndTest] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      const res = await getQuestionsTopic(topicId);

      if(numQuestions === res.length){
        const newQuestions = []; 
        res.map(question => newQuestions.push({...question, "select": -1}))
        setRandomQuestions(newQuestions);
        return;
      }
        
      const numbers = [];
      while(numbers.length<numQuestions){
        const numberRandom = Math.floor(Math.random() * res.length) + 1;
        if (!numbers.includes(numberRandom)) {
          numbers.push(numberRandom);
        }
      }
      const newQuestions = [];
      numbers.map((number)=>newQuestions.push({...res[number], "select": -1}));
      setRandomQuestions(newQuestions);
    };
    getQuestions();
  }, []);

  const handleSelect = (e) => {
    setSelectedOption(Number(e.target.value));
    setRandomQuestions(prevQuestions => 
      prevQuestions.map((question, index) =>
        index === currentQuestion ? { ...question, select: Number(e.target.value) } : question
      )
    )
  };
  
  const handleQuestion = (num)=>{
    setSelectedOption(null);
    setCurrentQuestion(num);
  } 

  const handlePrevQuestion = () =>{
    if(currentQuestion>0){
      setSelectedOption(null);
      setCurrentQuestion(num=>num-1);
    }
  }

  const handleNextQuestion = () =>{
    if(currentQuestion+1<numQuestions){
      setSelectedOption(null);
      setCurrentQuestion(num=>num+1);
    }
  }
  
  const onCompleted = ()=>{
    if(endTest) return;
    Swal.fire({
      title: "Success!",
      text: "Your test has been submitted successfully!",
      icon: "success"
    });
    setEndTest(true);
  }

  const onSubmit = ()=>{
    if(endTest) return;
    Swal.fire({
      title: "Are you sure you want to submit?",
      text: "You will not be able to change your answers after submitting!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!"
    }).then((result) => {
      if (result.isConfirmed) {
        onCompleted();
      }
    });
  }

  const handleTestEnd = ()=>{
    if(!endTest) return;

    const checkAnswers = () =>{
      const answers = [...randomQuestions].map((question)=> {
        const result = question.correctAnswer === question.select;
        return {
          "id": question.id,
          "select": question.select,
          "result": result 
        }
      })
      const time = new Date();
      const userAnswer = {
        "answers": answers, 
        "userId": currentUser?.id || -1, 
        "topicId":topicId,
        "level": level,
        "numQuestions": numQuestions,
        "timeLimit": numQuestions * timeLimits[level],
        "submittedAt": time
      } 
      postUserAnswer(userAnswer);
    }
    
    checkAnswers();
    console.log('end test');
  }

  useEffect(()=>{
    handleTestEnd();
  }, [endTest])

  
  return (
    <section className="test">
      <div className="test__content">
        <h2 className="test__header">{topicName}</h2>
        <div className="test__filed">
          <p className="test__question">Question {currentQuestion + 1}</p>
          <p className="test__question-detail">{randomQuestions[currentQuestion]?.question}</p>
          <div className="test__choice">
            {randomQuestions[currentQuestion]?.options?.map((question, index) => (
              <p key={index}>
                <label htmlFor={index} className={index===randomQuestions[currentQuestion].select ? "test__label test__label--active" : "test__label"} >
                  <input type="radio" className="test__radio" name="test" id={index} value={index} hidden checked={index === selectedOption} onChange={handleSelect}/>
                  {String.fromCharCode(65 + index)}
                </label>
                <span>{question}</span>
              </p>
            ))}
          </div>

          <div className="test__time">
            <CountdownTimer 
              initialTimeInSeconds={numQuestions * timeLimits[level]} 
              onTimerEnd={onCompleted}
              endTest={endTest}
            />
          </div>
        </div>
        <div className="test__control">
          <span className="test__prev" onClick={handlePrevQuestion}>Prev</span>
          <span className="test__next" onClick={handleNextQuestion}>Next</span>
        </div>
        
      </div>

      <div className="test__info">
        <div className="test__info-content">
          <p className="test__avatar">
            <IoPerson />
          </p>
          <p className="test__fullname">{currentUser?.fullName || "Guest"}</p>
          <p className="test__email">{currentUser?.email || "SAY HELLO"}</p>
        </div>

        <div className="test__number">
          <ul className="test__list">
            {Array.from({length: numQuestions}).map((_, index) => (
              <li
                key={index}
                className={
                  currentQuestion === index
                    ? "test__item test__item--active"
                    : "test__item"
                }
                onClick={()=>handleQuestion(index)}
              >
                <span>{index + 1}</span>
                <span className={randomQuestions[index]?.select !== -1 ? "test__done test__done--active" : "test__done" }><TiTick /></span>
              </li>
            ))}
          </ul>
        </div>

        <span className="test__submit" onClick={onSubmit}>Submit</span>
      </div>
    </section>
  );
};

export default Test;
