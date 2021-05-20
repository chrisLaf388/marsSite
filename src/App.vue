<template>
  <!-- <Header v-bind:user="user"></Header> -->
  <!-- <router-view v-bind:user="user"></router-view> -->
  <Header></Header>
  <router-view></router-view>

</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      
    };
  },
  
};
</script>

<style>
body {
  background: #15548F;
  background-size: cover;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>