<template>
  <v-app>
    <NavBar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from './components/navbar/NavBar.vue';


export default {
  name: 'App',

  components: {
    NavBar
},

  data: () => ({
    //
  }),
};
</script>
