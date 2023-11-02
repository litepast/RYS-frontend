# RYS Backend

This repository is the frontend logic for the complete application, [the RYS backend repository](https://github.com/litepast/RYS-backend) hosts the frontend logic, for which I used Python! That would need to be set up and be running first in order for this to fully work.

RYS (an acronym for Rate Your Spotify) is a personal project where you can add metadata of albums from Spotify on a personal database, so you can rate, play and edit them! Basically, a Spotify web player where you can add albums to your library and then play and rate them.

The motivation for this project is my love for music and the fact I really really like ratings stuff in my head plus the idea it would be great to get some sort of data analysis behind your ratings. My music plaform of choice had been Spotify for years and them having their API for free was a great match. The rating systems is heavily inspired by the site [rate your music](www.rateyourmusic.com) (now you know my project's name is not original!), where you can give music album ratings, but you cannot listen to them. The site is great enough for it to link you to streaming plarforms where you can listen to music via links to Spotify, Apple music and so on, but I wanted a sort of mix between the two where you can rate and play the songs on the same web app! Spotify as of this moment (November 2023) doesn't have the feature to give a numerical rating to albums or tracks, as it focuses on giving you recommendations given your listening habits.

This repository is built mainly using [Vue.Js Version 3](https://vuejs.org/) as the framework, in addition (Tailwind)[https://tailwindcss.com/] for the styling. The UI is obviously inspired by the current Spotify UI to give a sense of familiarity.

## Features
__You need an Spotify Premium Account for Music Playback!__
  
* Search albums by artists or album name
* Add searched albums to your library
  * On the album page, the header background color will be that of the most dominant color on the cover (most of the time)! Just like Spofify does.     
* Play the albums in your library  
  * With shuffle and repeat funcionality! As of now, the play queue can only have one album's tracks. 
* Rate the albums and also its songs on a scale from 0.5 to 5 stars
  * Get a suggested rating for the album if all the songs are rated, using multiple custom formulas created by me.
* Get genres and styles (sub-genres) of album. 
* Edit genres/styles or type of release such as album, single, compilation and EP. EP (Extended Play) is not used on the Spotify Data
* Get insight about your ratings, such as your favorite artists, years, decades and genres given your ratings by a dash dadhboard launched on the backend.

The reason for needing to add albums to your library in order to do the things above, is because this is not meant to substitute the Spotify core experience, but to have a database where you can have a sort of digital library with your ratings and such.


## Screenshots
##### Search showing new releases!
![First Search](/screenshots/first_search_home.JPG?raw=true)
##### Search by Album Name
![Artist Search](/screenshots/search_album.JPG?raw=true)
##### Search by Artist Name
![name Search](/screenshots/search_artists.JPG?raw=true)
##### Library (Albums added on the Search page)
![lib](/screenshots/library.JPG?raw=true)
##### Album page (can only be accessed if album is on Library)
![album](/screenshots/album.JPG?raw=true)
##### Dash Dashboard
![Dash Dashboard](/screenshots/dash_dashboard.JPG?raw=true)
##### Tableau Dashboatd
![Tableau Dashboard](/screenshots/tableau.JPG?raw=true)

## A little insight on the suggested rating





## How to use this Project

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


### Set the backend API's

### Set up config.js

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

After clonning the repository, run this to install of the libraries needed.
```sh
npm install
```

### Compile and Hot-Reload for Development

Run the next to launch on your localhost
```sh
npm run dev
```
This to access it on your local network
```sh
npm run dev -- host
```

### Compile for Production

Run the next command and mount the dist folder on a web server of your choice if you want!
```sh
npm run build
```

## Credits
player component materials
