<template>
  <div class='sign-up'>
    <h2>Sign Up</h2>
    <hr />
    <input type='text' placeholder='email' v-model='email'><br>
    <input type='password' placeholder='password' v-model='password'><br>
    <button @click='signUp'>Sign Up</button>
    <p><router-link to='/login'>Sign In</router-link></p>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import axios from 'axios';

  export default {
    name: 'signUp',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            this.saveUser();
            this.$router.replace('genres');
          }, (err) => {
              alert(`Error: ${err.message}`);
          })
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
  .sign-up {
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
</style>
