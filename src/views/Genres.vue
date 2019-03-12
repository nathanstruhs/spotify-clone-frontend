<template>
  <div>
    <h2>Genres</h2>
    <hr />
    <ul>
      <li v-for='genre in genres' :key='genre'>
        <router-link :to="{ name: 'songs', params: { genre } }">{{ genre }}</router-link>
      </li>
    </ul>
    <br>
    <button @click='logout'>Sign Out</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';

export default {
  name: 'genres',
  data() {
    return {
      genres: null
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut()
        .then(() => {
          this.$router.replace('login')
        })
    }
  },
  mounted () {
    axios
      .get('http://ec2-54-210-16-67.compute-1.amazonaws.com:3000/genres')
      .then(response => (this.genres = response.data))
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
  }

  li {
    border-bottom: 1px solid #282828;
    padding: 5px;
  }

  li:hover {
    background-color: #282828;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 16px;
  }
</style>
