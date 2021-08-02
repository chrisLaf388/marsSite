<template>
  <header
    class="d-flex justify-content-between align-items-center p-2 bg-white"
  >
    <img
      src="../assets/logo.png"
      id="logo"
      alt="logo"
      @click="rediriger"
    />
    <div
      class="d-flex justify-content-end align-items-center"
      id="connexion"
      v-if!="getLogin"
    >
      <div class="fs-5 mr-5 text-primary" id="pseudo">
        Bonjour, {{ getLogin }}
      </div>
      <i
        id="deconnexion"
        class="fas fa-power-off fs-5 text-primary"
        @click="logout"
      ></i>
    </div>
  </header>
</template>

<script>
import axios from "axios";

export default {
  name: "Header",
  methods: {
    logout: async function () {
      await axios
        .get("http://localhost:90/mars/logout", {
          withCredentials: true,
        })
        .catch((e) => {
          console.log(e);
        })
        .then(() => {
          localStorage.clear();
          this.$store.dispatch("setLogin", null);
          this.$router.push("/");
        });
    },
    rediriger: function () {
      switch (localStorage.getItem("role")) {
        case "ADMIN":
          this.$router.push("/listeUtilisateursByAdmin");
          break;
        case "SUPERVISEUR":
          this.$router.push("/listeUtilisateursBySuperviseur");
          break;
        case "AGENT":
          this.$router.push("/accueilAgent");
          break;
      }
    },
  },
  computed: {
    getLogin: function () {
      if (this.$store.getters.getLoginFromStore !== 'null'){
        return this.$store.getters.getLoginFromStore;
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 3%;
}
#deconnexion:hover {
  color: #dc3545 !important;
}
#connexion div {
  padding-right: 10px;
  font-weight: bold;
}
#deconnexion,
#logo {
  cursor: pointer;
}
input:focus,
textarea:focus,
button:focus,
select:focus {
  outline: 0;
}
</style>