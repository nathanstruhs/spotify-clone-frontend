import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Genres from '@/views/Genres.vue'
import Login  from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Songs from '@/views/Songs.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/genres',
      name: 'genres',
      component: Genres,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/songs/:genre',
      name: 'songs',
      component: Songs,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (!requiresAuth && currentUser) {
    next('genres');
  } else {
    next();
  }
});

export default router;