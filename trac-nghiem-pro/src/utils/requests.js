const DOMAIN_API = "https://tracnghiempro.onrender.com/";
// const DOMAIN_API = "http://localhost:4000/";

const request = async (method, path, data = null, options = {}) => {
  const defaultOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (data) {
    defaultOptions.body = JSON.stringify(data);
  }

  const response = await fetch(DOMAIN_API+path, defaultOptions);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: 'No body' }));
    throw new Error(`HTTP error! status: ${response.status}: ${errorBody.message}`);
  }
  
  return response;
};

export const get = (path, options) => request('GET', path, null, options);
export const post = (path, data, options) => request('POST', path, data, options);
export const put = (path, data, options) => request('PUT', path, data, options);
export const del = (path, options) => request('DELETE', path, null, options);
export const patch = (path, data, options) => request('PATCH', path, data, options);


// export const get = async (path, options = {}) => {
//   const response = await fetch(path, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     },
//     ...options,
//   });
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// }

// export const post = async (path, data, options = {}) => {
//   const response = await fetch(path, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     },
//     body: JSON.stringify(data),
//     ...options,
//   });
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// }

// export const put = async (path, data, options = {}) => {
//   const response = await fetch(path, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     },
//     body: JSON.stringify(data),
//     ...options,
//   });
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// }

// export const del = async (path, options = {}) => {
//   const response = await fetch(path, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     },
//     ...options,
//   });
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// }

// export const patch = async (path, data, options = {}) => {
//   const response = await fetch(path, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       ...options.headers,
//     },
//     body: JSON.stringify(data),
//     ...options,
//   });
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// }
