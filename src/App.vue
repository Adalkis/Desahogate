<template>
  <div id="app">
    <div id="nav">
      <div class="nav_items">
        <router-link to="/"
          ><b-icon class="nav_icons" icon="house-door"></b-icon
        ></router-link>
        <router-link @click.native="logout" to="/" v-if="isAuthenticated"
          ><b-icon class="nav_icons" icon="box-arrow-right"></b-icon>
        </router-link>
        <router-link to="/login" v-if="!isAuthenticated"
          ><b-icon class="nav_icons" icon="person"></b-icon
        ></router-link>
      </div>
    </div>

    <router-view :key="$route.path" />
  </div>
</template>

<script >
import authApi from "@/api/auth/auth";
import dashboardComponent from './components/dashboardComponent.vue';

export default {
  components: { dashboardComponent },
  data() {
    return {
      user: [],
    };
  },
  methods: {
    logout() {
      authApi.logout(this.user).then((res) => {
        this.$store.dispatch("SETAUTH", false);
      });
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.login.isLoggedIn;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ecf3ff;
  width: 100%;
}

#nav {
  padding: 12px;
  background: #0063cf;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  min-width: 700px;
}

#nav a {
  font-weight: bold;
  color: black;
}

#nav a.router-link-exact-active {
  color: black;
}
html {
  background: #ecf3ff;
  width: 100%;
}

.side_bar_items {
  display: flex;
  justify-content: center;
}
.row {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.nav_icons {
  color: white;
  font-size: 25px;
}
.nav_items {
  display: flex;
  justify-content: space-evenly;
}
</style>
