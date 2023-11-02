# RYS Frontend

This repository is the frontend logic for the complete application, [the RYS backend repository](https://github.com/litepast/RYS-backend) hosts the frontend logic, for which I used Python! That would need to be set up and run first in order for this to fully work.

RYS (an acronym for Rate Your Spotify) is a personal project where you can add metadata of albums from Spotify on a personal database, so you can rate, play and edit them! Basically, a Spotify web player where you can add albums to your library and then play and rate them.

The motivation for this project is my love for music and the fact I really really like ratings stuff in my head plus the idea it would be great to get some sort of data analysis behind your ratings. My music plaform of choice had been Spotify for years and them having their API for free was a great match. The rating system is heavily inspired by the site [rate your music](www.rateyourmusic.com) (now you know my project's name is not original!), where you can give music album ratings, but you cannot listen to them. The site is great enough for it to link you to streaming platforms where you can listen to music via links to Spotify, Apple music and so on, but I wanted a sort of mix between the two where you can rate and play the songs on the same web app! Spotify as of this moment (November 2023) doesn't have the feature to give a numerical rating to albums or tracks, as it focuses on giving you recommendations given your listening habits.

This repository is built mainly using [Vue.Js Version 3](https://vuejs.org/) as the framework, in addition (Tailwind)[https://tailwindcss.com/] for the styling. The UI is obviously inspired by the current Spotify UI to give a sense of familiarity. I'd like to add that as of right now, this project works with only one user/spotify application!


## Thanks
https://github.com/Lakshya0257/LUNA-Spotify-  by https://github.com/Lakshya0257/ for making public how to easily connect and control the Spotify Web Player with Vue.JS

## Features

__You need a Spotify Premium Account for Music Playback!__

* Search for albums by artists or album name
* Add searched albums to your library
  * Filter your Library albums by ratings, artists, album names, genre, style, years.   
  * Albums rated 5 stars will be shown in a golden badge, to show your favorites     
* Play the albums in your library
  * On the album page, the header background color will be that of the most dominant color on the cover (most of the time)! Just like Spofify does.   
  * With shuffle and repeat functionality! As of now, the play queue can only have one album's tracks. 
* Rate albums and also its songs on a scale from 0.5 to 5 stars
  * Get a suggested rating for the album if all the songs are rated using multiple custom formulas created by me.
  * You can choose which tracks are counted towards the suggested rating, by the Included checkbox. This might be useful if the album has a track which lasts seconds and might affect the overall average, and sometimes it might not be a typical song.
  * Mark your truly favorite songs with the GOATED mark, this will be the track 5 stars plus a little extra ;) which will boost the suggested rating
* Get genres and styles (sub-genres) of the albums. 
* Edit genres/styles or type of release such as album, single, compilation and EP. EP (Extended Play) is not used on the Spotify Data
* Get insight about your ratings, such as your favorite artists, years, decades and genres given your ratings by a dash dashboard launched on the backend, displayed by the frontend.

The reason for needing to add albums to your library in order to do the things above, is because this is not meant to substitute the Spotify core experience, but to have a database where you can have a sort of digital library with your ratings and such.

## Screenshots
##### Search showing the newest releases
![First Search](/screenshots/first_search_home.JPG?raw=true)
##### Search by Album Name
![Artist Search](/screenshots/search_album.JPG?raw=true)
##### Search by Artist Name
![name Search](/screenshots/search_artists.JPG?raw=true)
##### Library 
![lib](/screenshots/library.JPG?raw=true)
##### Album page 
![album](/screenshots/album.JPG?raw=true)
##### Dash Dashboard
![Dash Dashboard](/screenshots/dash_dashboard.JPG?raw=true)
##### Tableau Dashboard
![Tableau Dashboard](/screenshots/tableau.JPG?raw=true)

## A little insight on the suggested rating

Place Holder!

## How to use this Project

### Set the backend (database, RESTful Api and Dash Dashboard)

Follow the instructions for the [Backend Set Up](https://github.com/litepast/RYS-backend#how-to-use-this-project). The flask server with the RESTful API, dash dashboard and the MySQL database.

### Set up config.js

After setting up the backend, change the name of the *config_dummy.js* file to *config.js* and set each of the variables as the followin

* REDIRECT_URI will be the ip where the Vue will be host, it should be "http://localhost:5173/" 
* CLIENT_ID and CLIENT_SECRET will be the same as set in [backend config file](https://github.com/litepast/RYS-backend#set-up-the-configpy-file), as for Spotify we will be using the same application, the main the difference is that the API keys here will be used for access to the [Spotify Web Player](https://developer.spotify.com/documentation/web-playback-sdk), so we can listen to the albums added, meanwhile on the backend they are used for the [Web Api](https://developer.spotify.com/documentation/web-api), where we get the albums metadata displayed on the webapp and saved on the database.
* FLASK_API is the ip where the Flask api is served, by running [this file in the backend](https://github.com/litepast/RYS-backend/blob/main/src/flask_api/app.py), when run locally it should be "http://localhost:5000/"
* USER_NAME is the name shown in the top right corner, set it to your name, mine was set to "Enrique".
* DASH_URL is the ip hosting the Dashboard, by running [this file in the backend](https://github.com/litepast/RYS-backend/blob/main/src/dash_dashboard/dash_index.py),  when run locally it should be "http://localhost:8050/"-

### Install npm libraries

After clonning the repository, run this to install of the libraries needed.
```sh
npm install
```

### Compile and Hot-Reload for Development

Run the next to launch on your localhost.
```sh
npm run dev
```
Or this to access it on your local network, wait for the ips to show
```sh
npm run dev -- host
```

### Compile for Production
Run the next command and mount the dist folder on a web server of your choice if you want!
```sh
npm run build
```

