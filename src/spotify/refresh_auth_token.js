// import axios from 'axios';
// import { Buffer } from 'buffer';
// import {REDIRECT_URI, CLIENT_ID, CLIENT_SECRET} from '../../config'


// export function generateAccessToken(){
//     const params = new URLSearchParams();
//       params.append('grant_type', 'refresh_token');
//       params.append('refresh_token', localStorage.getItem('refresh_token'));
//       params.append('scope', 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state app-remote-control streaming user-top-read');


//       axios
//         .post('https://accounts.spotify.com/api/token', params, {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
//           }
//         })
//         .then(response => {
//           console.log('bye');
//             console.log(response.data.access_token);
//           localStorage.setItem('access_token', response.data.access_token);
//           return 'token'
//         })
//         .catch(e => {
//           console.log('bye');
//           console.log(e);
//         });
// }


import axios from 'axios';
import { Buffer } from 'buffer';
import {REDIRECT_URI, CLIENT_ID, CLIENT_SECRET} from '../../config'
import { generateToken } from './auth_token';

export async function generateAccessToken() {
  if(localStorage.getItem('refresh_token')===null){
    await generateToken();
  }
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', localStorage.getItem('refresh_token'));
  params.append('scope', 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state app-remote-control streaming user-top-read');

  return axios.post('https://accounts.spotify.com/api/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      }
    })
    .then(response => {
      console.log('bye');
      console.log(response.data.access_token);
      localStorage.setItem('access_token', response.data.access_token);
      return 'token';
    })
    .catch(e => {
      console.log('bye');
      console.log(e);
    });
}