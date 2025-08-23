const topicPopularReducer = ( state = null ,action ) => {
  switch(action.type){
    case "ADD_TOPIC_POPULAR":
      return action?.payload
    default:
      return state
  }
};

export default topicPopularReducer;