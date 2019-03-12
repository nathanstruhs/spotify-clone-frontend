<template>
  <div class='content column'>
    <div class='title-bar'>
      <h2>{{genre}}</h2>
      <router-link class='back-link' to='/genres'>Back to Genres</router-link>
      <hr>
    </div>

    <div v-for='artist in music'>
      <h3>{{ artist.artist }}</h3>
      <div v-for='album in artist.albums'>
        <h4>{{ album.name }}</h4>
        <div class='songs' v-for='song in album.songs'>
          <a class='song-item' @click='setCurrentSong(song.url, song.name, artist.artist, album.name)'>{{ song.name | removeSuffix }}</a>
        </div>
      </div>
    </div>

    <div id='media-player'>
      <div class='media-player-title'>
        <h4>Now Playing</h4>
        {{ currentSongName | removeSuffix }}
      </div>
      <audio v-on:play='logPlay' controls="controls" id="audio-player" :src='currentSongUrl' />
    </div>
  </div>
</template>

<script>
import Store from '../store';
import axios from 'axios';

export default {
  name: 'Songs',
  data () {
    return {
      msg: 'Songs',
      storeState: Store.state,
      genre: this.$route.params.genre,
      music: [],
      currentSongUrl: '',
      currentSongName: '',
      currentArtist: '',
      currentAlbum: ''
    }
  },
  mounted() {
    axios.get(`http://ec2-54-210-16-67.compute-1.amazonaws.com:3000/artist/for/genre?genre=${this.genre}`)
      .then(response =>  {
        this.artists = response.data;
        response.data.forEach((artist) => {
          for (let i = 0; i < this.storeState.musicLibrary.length; i++) {
            if (this.storeState.musicLibrary[i].artist === artist) {
              this.music.push(this.storeState.musicLibrary[i])
            }
          }
        });
      });
  },
  methods: {
    setCurrentSong: function(src, name, artist, album) {
      this.currentSongUrl = src;
      this.currentSongName = name;
      this.currentArtist = artist;
      this.currentAlbum= album;
    },
    logPlay: function() {
      axios.post('http://ec2-54-210-16-67.compute-1.amazonaws.com:3000/play', {
        artist: this.currentArtist,
        album: this.currentAlbum,
        song: this.currentSongName
      });
    }
  },
  filters: {
    removeSuffix: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.slice(0, -4)
    }
  }
}
</script>

<style scoped>
  #media-player {
    margin-top: 100px;
    width: 100%;
    height: 100px;
    background-color: black;
  }

  .media-player-title {
    color: white;
    font-size: 16px;
    float: left;
    height: 100%;
    width: 20%;
    border-right: 1px solid white;
    margin-right: 50px;
  }

  #audio-player {
    margin-top: 25px;
    width: 50%;
    background-color: black;
  }

  .song-item {
    border-bottom: 1px solid #282828;
    padding: 5px;
    width: 100%;
    display: block;
  }

  .song-item:hover {
    background-color: #282828;
    padding: 5px;
  }

  .songs {
    margin-left: 20px;
  }

  .back-link {
    right: 0;
    color: white;
  }
</style>