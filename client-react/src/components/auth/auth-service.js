// auth/auth-service.js

import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/auth',
  withCredentials: true
});
export default service;
////////////////////////////////
const errorHandler = err => {
  // console.error(err);
  throw err;
};



/// sign up route////

function signup(username, password, confirmPassword, email,image) {
  return service.post('/signup', {username, password,confirmPassword, email,image}).then(response => response.data)
}
export {signup}

/////////// log in route//////////
 
function login(username, password) {
  return service.post('/login', {username, password}).then(response => response.data)
}
export {login}
////////// loggedin route//////////
function loggedin() {
  return service.get('/loggedin').then(response => response.data)
}
export {loggedin}

/////////// log out ////////////////
 
function logout() {
  return service.post('/logout', {}).then(response => response.data)
}
export {logout}
////////////upload an image//////////////
function handleUpload(theFile) {
  // console.log('file in service: ', theFile)
  return service
    .post('/upload', theFile)
    .then(res => res.data)
    .catch(errorHandler);
}
export {handleUpload}

//////save in data base image///////////
// function saveNewThing(newThing) {
//   // console.log('new thing is: ', newThing)
//   return service
//     .post('/things/create', newThing)
//     .then(res => res.data)
//     .catch(errorHandler);
// }
// export {saveNewThing}