
const client_id = '3382493d2f4b4131a180974372a2f024';
const redirect_uri = 'http://localhost:3000/';

function generateRandomString(){
  let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = 16;
    let counter = 0;
    while (counter < charactersLength) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
export async function getAccessToken() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  const expiresIn = params.get('expires_in');

  if (accessToken && expiresIn) {
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem('spotify_access_token', accessToken);
      localStorage.setItem('spotify_token_expiration', expirationTime);
      return accessToken;
  }

  const storedToken = localStorage.getItem('spotify_access_token');
  const storedExpiration = localStorage.getItem('spotify_token_expiration');

  if (storedToken && storedExpiration && new Date().getTime() < storedExpiration) {
      return storedToken;
  }

  return null;
}

export default function Spotify(){
const state = generateRandomString();
localStorage.setItem('poopoo', state);
const scope = 'user-read-private user-read-email';
let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);
return url;
}
