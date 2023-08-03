//import { getQueue } from './queue';
//import eventBus from '../../event_bus/event_bus';
//import store from '../../src/stores/store';

//disconnecting player before user reload the page
window.addEventListener('beforeunload', event => {
  player.disconnect();  
});

//All the variable declarations.
let songPlaying = false;
let queueData = {
  "data":{
    "tracks":[]
  }
};
let index = 0;
const timeoutIds = [];
let player = null;
let deviceId = null;
let currentSong = {};

//Initializing player
export const getPlayer = () => {
  return player;
};

export const getPrebuiltQueue = () => {
  return queueData;
};
export const getCurrentSong = () => {
  return currentSong;
};

//Player play-pause functions.
//Just import it anywhere and call to play and pause the song
export const playerPause = () => {
  player.pause();
  songPlaying = false;
};
export const playerPlay = () => {
  player.resume();
  songPlaying = true;
  updateTime();
};

// Clear all setTimeout functions
function terminateUpdatetime() {
  timeoutIds.forEach(id => clearTimeout(id));
}
let retry=0;

//playing song
//export const playSong = async (data, via, inde) => {
export const playSong = async (data) => {
  terminateUpdatetime();
  currentSong = data;
  //await store.dispatch('setData', data);
  //Checking if song is played by user or autoplayed via queue.
//   if (via === 'onUserClick') {
//     index = 0;
//   } else if (via === 'autoplay') {
//     eventBus.emit('nextSong', data);
//     index = index + 1;
//   } else if (via === 'queueClick') {
//     index = inde + 1;
//   }

  
  const uri = `spotify:track:${data}`
  //const uri = data['uri'];
  console.log('URIIII', uri);



  player.activateElement();
  if (player) {
    console.log('playing');
    const token = localStorage.getItem('access_token');
    const play = ({
      spotify_uri,
      playerInstance: {
        _options: { getOAuthToken, id }
      }
    }) => {
      getOAuthToken(access_token => {
        fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
          {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
          .then(response => {
            retry=0;
            if (response.ok) {
              console.log('Song played successfully');
            } else {
              throw new Error('Failed to play song');
            }
          })
          .catch(error => {
            if (error.response && error.response.status === 502) {
              console.log('Failed to play song');
            }
            else if(retry===3) {
              console.log('You dont have permission to access this, please purchase a subscription');
            }
             else {
              retry++;
              console.error('Error playing song:', error);
              playSong(data, 'retry');
            }
          });
      });
    };
    play({
      playerInstance: player,
      spotify_uri: uri
    });

    //Listener for updating song progress
    player.addListener(
      'player_state_changed',
      ({ position, duration, track_window: { current_track } }) => {
        
        if (position === 0) {
          songPlaying = true;
          //updateTime();
        }
      }
    );

    //getting queue if user has played the song
    // if (via === 'onUserClick') {
    //   queueData = {
    //     "data":{
    //       "tracks":[]
    //     }
    //   };
    //   console.log(data);
    //   const queueD = await getQueue(data['id'], data['artists'][0]['id']);
    //   await queueD.data.tracks.forEach(element => {
    //     // If the item doesn't exist in x, add it
    //     if (element.uri!==data.uri) {
    //       queueData.data.tracks.push(element);
    //     }
    //   });
    //   console.log('Queue');
    //   console.log(queueData);
    // }
    // if (index >= queueData.data.tracks.length - 4) {
    //   const queueD = await getQueue(data['id'], data['artists'][0]['id']);
    //   await queueD.data.tracks.forEach(element => {
    //     const existsInX = queueData.data.tracks.some(
    //       xItem => xItem.uri === element.uri
    //     );
    //     // If the item doesn't exist in x, add it
    //     if (!existsInX) {
    //       queueData.data.tracks.push(element);
    //     }
    //   });
    //   // await queueD.data.tracks.forEach(track=>{
    //   //   queueData.data.tracks.push(track);
    //   // });


    //   //eventBus.emit('queueUpdate', queueData);

    // }

  } else {
    console.error('Player is not available.');
  }
};

export const jumptoprevious=()=>{
  if(index!=0){
    index=index-2;
    songPlaying=false;
    playerPause();
    playSong(queueData['data']['tracks'][index], 'autoplay');
  }
}
export const jumptonext=()=>{
    // index=index+1;
    songPlaying=false;
    playerPause();
    // console.log(index);
    playSong(queueData['data']['tracks'][index], 'autoplay');
}

//Update time function
//Responsible for updating the sequence and progress of the song.
//Also responsible for auto playback.
// const updateTime = async () => {
//   let progressBar = document.getElementById('progressBar');
//   // if(window.location.pathname === '/'){
//   //   progressBar =
//   // }else{
//   //   progressBar = document.getElementById('PlayerProgressBar');
//   // }
//   await player
//     .getCurrentState()
//     .then(state => {
//       if (songPlaying) {
//         const currentPosition = state.position;
//         const duration = state.duration;
//         const progressPercentage = (currentPosition / duration) * 100;
//         progressBar.value = progressPercentage;
//         progressBar.style.background =
//           'linear-gradient(to right, green, ' +
//           (currentPosition / duration) * 100 +
//           '%, grey ' +
//           (currentPosition / duration) * 100 +
//           '%)';

//         let currentTime = document.getElementById('currentTime');
//         let endingTime = document.getElementById('finalTime');
//         let minutes = Math.floor(currentPosition / 60000);
//         let seconds = Math.floor((currentPosition % 60000) / 1000);
//         currentTime.innerHTML =
//           minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
//         let endingMinutes = Math.floor(duration / 60000);
//         let endingSeconds = Math.floor((duration % 60000) / 1000);
//         endingTime.innerHTML =
//           endingMinutes + ':' + (endingSeconds < 10 ? '0' : '') + endingSeconds;
//       }
//     })
//     .catch(error => console.error(error));
//   if (progressBar.value == 100 && songPlaying) {
//     songPlaying = false;
//     progressBar.value = 0;
//     console.log('playing-next');
//     playerPause();
//     playSong(queueData['data']['tracks'][index], 'autoplay');
//   } else if (songPlaying) {
//     const timeoutId = setTimeout(() => {
//       updateTime();
//     }, 1000);
//     timeoutIds.push(timeoutId);
//   }
// };

export const forceTimeUpdation = value => {
  songPlaying = value;
  if (songPlaying) {
    updateTime();
  }
};

//seek through progressBar
export const seekPlayerSong = async value => {
  // const value=document.getElementById('progressBar').value;
  // songPlaying=false;
  console.log(value);
  const seekValue = (currentSong.duration_ms * value) / 100;
  await player.seek(seekValue).then(() => {
    console.log('Changed position!');
  });
};

//Initializing the spotify player.
//This is the main entry point where user will create an auto instance of spotify SDK.
//Must Remember- It requires an premium account for working. Free trial accounts are not acceptable.

// Function to run the Spotify installation code
function runSpotifyInstallation() {
  console.log("Spotify");
  // let loaded=false;
  const script = document.createElement('script');
  script.src = 'https://sdk.scdn.co/spotify-player.js';
  script.onload = () => {
    let token = localStorage.getItem('access_token');
    window.onSpotifyWebPlaybackSDKReady = () => {
      // Define the Spotify Connect device, getOAuthToken has an actual token
      // hardcoded for the sake of simplicity
      player = new Spotify.Player({
        name: 'My RYS Web Player yo',
        getOAuthToken: callback => {
          callback(token);
        },
        volume: 1
      });
      player.addListener('initialization_error', ({ message }) => {
        console.error(message + " initialization_error");
      });

      player.addListener('authentication_error', ({ message }) => {
        
        // Re-run the Spotify installation code
        // if(retry===3){
        //   retry=0;
          console.error(message + " authentication");
        // }else{
        //   retry++;
        //   runSpotifyInstallation();
        // }
      });

      player.addListener('account_error', ({ message }) => {
        console.error(message + " account");
      });

      // Called when connected to the player created beforehand successfully
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        deviceId = device_id;
      });

      player.connect();
    };
  };
  document.body.appendChild(script);
}

export default {
  install: (Vue, options) => {
    runSpotifyInstallation();
  }
};

