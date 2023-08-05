import { usePlayerStore } from '../stores/player-store.js'


let songPlaying = false;
let index = 0;
const timeoutIds = [];
let player = null;
let deviceId = null;

export const getPlayer = () => {
  return player;
}
export const playerPause = () => {
  const PlayerStore = usePlayerStore();
  console.log('pause');
  player.pause();
  PlayerStore.songPlaying = false;
}
export const playerPlay = () => {
  const PlayerStore = usePlayerStore();
  console.log('resume');
  player.resume();
  PlayerStore.songPlaying = true;
  updateTime();
}
export const jumptoprevious=()=>{
  const PlayerStore = usePlayerStore();  
  index=PlayerStore.currentIndex;
  if(index!=0){
    PlayerStore.currentIndex=index-1;
    PlayerStore.songPlaying=false;
    playerPause();
    playSong();
  }
}
export const jumptonext=()=>{
    const PlayerStore = usePlayerStore();
    const index = PlayerStore.currentIndex;
    if(index!=PlayerStore.totalTracks-1){
      PlayerStore.currentIndex=index+1;
      songPlaying=false;
      playerPause();
      playSong();
    }
}
export const forceTimeUpdation = value => {
  const PlayerStore = usePlayerStore();
  PlayerStore.songPlaying = value;
  if (PlayerStore.songPlaying) {
    updateTime();
  }
}
export const seekPlayerSong = async value => {
  const PlayerStore = usePlayerStore();
  const seekValue = (PlayerStore.currentTrack.duration * value) / 100;
  await player.seek(seekValue).then(() => {
    console.log('Changed position!');
  });
};




// Clear all setTimeout functions
function terminateUpdatetime() {
  timeoutIds.forEach(id => clearTimeout(id));
}
let retry=0;

//playing song
//export const playSong = async (data, via, inde) => {
export const playSong = async () => {
  terminateUpdatetime();
  const PlayerStore = usePlayerStore();
  const currentTrack = PlayerStore.currentTrack;
  const uri = `spotify:track:${currentTrack.id}`
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
              
              PlayerStore.songPlaying = true;
              console.log(PlayerStore.songPlaying)
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
              playSong();
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
          usePlayerStore.songPlaying = true;
          updateTime();
        }
      }
    );


  } else {
    console.error('Player is not available.');
  }
};



//Update time function
//Responsible for updating the sequence and progress of the song.
//Also responsible for auto playback.
const updateTime = async () => {
  let progressBar = document.getElementById('progressBar');
  const PlayerStore = usePlayerStore();
  await player
    .getCurrentState()
    .then(state => {
      if (PlayerStore.songPlaying) {
        const currentPosition = state.position;
        const duration = state.duration;
        const progressPercentage = (currentPosition / duration) * 100;
        progressBar.value = progressPercentage;
        progressBar.style.background =
          'linear-gradient(to right, green, ' +
          (currentPosition / duration) * 100 +
          '%, grey ' +
          (currentPosition / duration) * 100 +
          '%)';

        let currentTime = document.getElementById('currentTime');
        let endingTime = document.getElementById('finalTime');
        let minutes = Math.floor(currentPosition / 60000);
        let seconds = Math.floor((currentPosition % 60000) / 1000);
        currentTime.innerHTML =
          minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        let endingMinutes = Math.floor(duration / 60000);
        let endingSeconds = Math.floor((duration % 60000) / 1000);
        endingTime.innerHTML =
          endingMinutes + ':' + (endingSeconds < 10 ? '0' : '') + endingSeconds;
      }
    })
    .catch(error => console.error(error));
  if (progressBar.value == 100 && PlayerStore.songPlaying) {
    PlayerStore.songPlaying = false;
    progressBar.value = 0;
    console.log('playing-next');
    playerPause();    
    jumptonext();
  } else if (PlayerStore.songPlaying) {
    const timeoutId = setTimeout(() => {
      updateTime();
    }, 1000);
    timeoutIds.push(timeoutId);
  }
};




window.addEventListener('beforeunload', event => {
  player.disconnect();  
});

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
        name: 'RYS Web Player yo!',
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

