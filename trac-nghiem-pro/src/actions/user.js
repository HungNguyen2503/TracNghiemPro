export const LOGIN = (user) =>{
  return {
    type: 'LOGIN',
    payload: user
  };
}

export const LOGOUT = () => {
  return {
    type: 'LOGOUT',
    payload: null 
  };
}