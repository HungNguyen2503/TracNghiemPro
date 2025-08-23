export const ADD_ALL_TOPIC = (topics) =>{
  return {
    type: 'ADD_ALL_TOPICS',
    payload: topics
  };
}

export const ADD_TOPIC_POPULAR = (topics) =>{
  return {
    type: 'ADD_TOPIC_POPULAR',
    payload: topics
  };
}