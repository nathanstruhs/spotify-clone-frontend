<template>
  <div id="app">
    <h1>Spotify Clone</h1>
    <router-view/>
  </div>
</template>

<script>
import Store from './store';

export default {
  name: 'App',
  data() {
    return {
      storeState: Store.state
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    background-color: black;
    color: white;
    padding: 40px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
    padding: 15px;
    font-size: 12px;
  }
</style>
