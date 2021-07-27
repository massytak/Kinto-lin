// auth/auth-service.js

import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/auth',
  withCredentials: true
});
export default service;
////////////////////////////////



/// sign up route////

function signup(username, password, confirmPassword, email) {
  return service.post('/signup', {username, password,confirmPassword, email}).then(response => response.data)
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