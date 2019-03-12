export default {
  state: {
    musicLibrary: {},
    currentArtist: '',
    currentAlbum: ''
  },

  getMusicLibrary() {
    return this.state.musicLibrary;
  },
  setMusicLibrary(musicLibrary) {
    this.state.musicLibrary = musicLibrary;
  },
  getCurrentArtist() {
    return this.state.currentArtist;
  },
  setCurrentArtist(artist) {
    this.state.currentArtist = artist;
  },
  getCurrentAlbum() {
    return this.state.currentAlbum;
  },
  setCurrentAlbum(album) {
    this.state.currentAlbum = album;
  }
};
