import {REDIRECT_URI, CLIENT_ID, CLIENT_SECRET} from '../../config'

var state = generateRandomString(16);
var scope = 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state app-remote-control streaming user-top-read';


export function userLogin(){
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const redirectUri = REDIRECT_URI;
  localStorage.setItem('access_token', 'null');
  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
    'app-remote-control',
    'streaming','user-top-read'
  ];
  // window.location=`${authEndpoint}?client_id=${CLIENT_ID}?response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
  //   "%20"
  // )}&response_type=token&show_dialog=true`;
      window.location =
        'https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
          response_type: 'code',
          client_id: CLIENT_ID,
          scope: scope,
          redirect_uri: REDIRECT_URI,
});

}

function generateRandomString(length) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}