import { get } from "../utils/requests";

export const checkUserLogin = async (userLogin) => {
  const res = await get(`users?email=${userLogin.email}&password=${userLogin.password}`);
  if (res.ok) {
    const [data] = await res.json();

    if (!data) return null;
    return data;
  }
  return null;
}

export const getAuthenticatedUser = async (token) =>{
  const res = await get(`users?token=${token}`);
  if(res.ok){
    const [data] = await res.json();
    if(!data) return null;
    return data;
  }

  return null;
}

export const tokenGenerator =(payload) =>{
  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  
  const encodeBase64 = (obj) => {
    const jsonString = JSON.stringify(obj);
    return btoa(jsonString);
  };
  
  const encodedHeader = encodeBase64(header);
  const encodedPayload = encodeBase64(payload);
  
  const mockToken = `${encodedHeader}.${encodedPayload}`;
  
  return mockToken;
}