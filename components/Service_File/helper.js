export default function isAuthenticate() {
  const token = sessionStorage.getItem('token_id');
  if (token && token.length > 10){
    return true;
  }

}
