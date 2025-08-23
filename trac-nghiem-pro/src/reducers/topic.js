const topicReducer = ( state = null ,action ) => {
  switch(action.type){
    case "ADD_ALL_TOPICS":
      return action?.payload
    default:
      return state
  }
};

export default topicReducer;