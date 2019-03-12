import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import Store from './store';
import axios from 'axios';

Vue.config.productionTip = false

let app = '';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: h => h(App),
      mounted() {
        axios.get('http://ec2-54-210-16-67.compute-1.amazonaws.com:3000/')
          .then(response =>  (Store.setMusicLibrary(response.data.musicLibrary)));
      }
    }).$mount('#app')
  }
});
