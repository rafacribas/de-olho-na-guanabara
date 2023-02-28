// import decode from 'jwt-decode';
import request from './router/requests';

export async function signIn (identifier, password) {
  const resposta = await request('POST', 'auth/local', {
    identifier,
    password
  });

  if (!resposta.error){
    localStorage.setItem('token', resposta.jwt);
    localStorage.setItem('userData', JSON.stringify(resposta.user));
    return true
  }
  return false
  
}

export function signOut () {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
}

export function isSignedIn () {
  const token = localStorage.getItem('token');
  if (token){
    return true
  }
  return false

}