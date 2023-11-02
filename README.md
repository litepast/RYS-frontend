# RYS Backend

This repository is the frontend logic for the complete application, [the RYS backend repository](https://github.com/litepast/RYS-backend) hosts the frontend logic, for which I used Python! That would need to be set up and be running first in order for this to fully work.

RYS (an acronym for Rate Your Spotify) is a personal project where you can add metadata of albums from Spotify on a personal database, so you can rate, play and edit them! Basically, a Spotify web player where you can add albums to your library.

## Features
__You need an Spotify Premium Accout for playback!__
  
* Search albums by artists or album name
* Add the album to your Library
* Play the albums in your library  
  * Get shuffle and repeat auto-play funcionality!   
* Rate the albums and also its songs on a scale from 0.5 to 5 stars
  * Get a suggested rating for the album if all the songs are rated, using multiple custom formulas created by me!
* Edit some data that Spotify might not get right, such as genres or type of release 
* Get insight about your ratings, such as your favorite artists, years, decades and genres given your ratings by a dash dadhboard!

The reason for needing to add albums to your library in order to do the things above, is because this is not meant to substitute the Spotify core experience, but to have a database where you can have a sort of digital library with your ratings and such.

The idea behind this is heavily inspired by the site [rate your music](www.rateyourmusic.com) (now you know my project's name is not original!), where you can give music album ratings, but you cannot listen to them. The site is great enough for it to link you to sites where you can listen to music via links to spotify, Apple music and so on, but I wanted a sort of mix between the two where you can rate and play the songs on the same web app! Spotify as of this moment (November 2023) doesn't have the feature to give a numerical rating to albums or tracks, as it focuses on giving you recommendations given your listening habits.

This repository is built mainly using [Vue.Js Version 3](https://vuejs.org/)

## Screenshots


## A little insight on the suggested rating



## How to use this Project

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

# Set up configs

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

## Credits

### Compile and Minify for Production

```sh
npm run build
```
