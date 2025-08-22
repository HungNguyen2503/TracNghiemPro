import LayoutDefault from "../layout/LayoutDefault";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Err404 from "../pages/Err404";
import Answer from "../pages/Answer";
import Topic from "../pages/Topic";
import TopicDetail from "../pages/TopicDetail";
import Test from "../pages/Test";
import AnswerDetail from "../pages/AnswerDetail";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children:[
      {
        index: true,
        element: <Home />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/topic",
        element: <Topic />
      },
      {
        path: "/answer",
        element: <Answer />
      },
      {
        path: "/topic-detail",
        element: <TopicDetail />
      },
      {
        path: "/test",
        element: <Test />
      },
      {
        path: "/answer-detail",
        element: <AnswerDetail />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "*",
    element: <Err404 />
  }
];