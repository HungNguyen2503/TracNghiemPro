const userReducer = ( state = null ,action ) => {
  state = action?.payload || null;
  return state;
};

export default userReducer;