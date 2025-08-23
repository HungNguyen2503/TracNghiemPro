const topicReducer = ( state = null ,action ) => {
  state = action?.payload || null;
  return state;
};

export default topicReducer;