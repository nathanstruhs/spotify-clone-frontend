<template>
  <div class='login'>
    <h2>Sign In</h2>
    <hr />
    <input type='text' placeholder='email' v-model='email'><br>
    <input type='password' placeholder='password' v-model='password'><br>
    <button @click='login'>Sign In</button>
    <button class='googs' @click='loginWithGoogle'>Sign In with Google</button>
    <p><router-link to='/sign-up'>Create an Account</router-link></p>
  </div>
</template>

<script>
  import axios from 'axios';
  import firebase from 'firebase'
  var provider = new firebase.auth.GoogleAuthProvider();

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((user) => {
              this.$router.replace('genres')
            },
            (err) => {
              alert(`Error: ${err.message}`)
            }
          )
      },
      loginWithGoogle: function() {
        firebase.auth().signInWithPopup(provider).then((result) => {
          this.saveUser();
          this.$router.replace('genres');
        });
      },
      saveUser: function() {
        let currentUser = firebase.auth().currentUser;
        axios.post(`http://ec2-54-210-16-67.compute-1.amazonaws.com:3000/save-user`,{
          id: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email
        });
      }
    }
  }
</script>

<style scoped>
  .login {
    margin-top: 40px;
  }

  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }

  p {
    margin-top: 40px;
    font-size: 13px;
  }

  p a {
    text-decoration: underline;
    cursor: pointer;
    color: white;
  }

  .googs {
    width: 18%;
    margin-left: 20px;
  }
</style>
