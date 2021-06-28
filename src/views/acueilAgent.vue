<template>
  <main class="mx-auto d-flex align-items-center">
    <div class="container login-container">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4 login-form-1 center px-5 py-4">
          <h3 class="text-center text-white mb-5">Welcome, </h3>
          <button                 
            class="btn btnSubmit d-block m-auto rounded-pill bg-transparent text-primary px-3 py-2 border-primary fs-5">
            Verifier ses heures
          </button>
          <button 
            class="btn btnSubmit d-block m-auto rounded-pill bg-transparent text-primary px-3 py-2 border-primary fs-5">
            Modifier profil
          </button>
        </div>
        <div class="col-4"></div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      role: "",
      login: "",
      password: "",
      error: null,
    };
  },
  methods: {
    loginRequest: async function () {
      const credential = window.btoa(this.login + ":" + this.password);

      await axios
        .get("http://localhost:90/mars/login", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + credential,
          },
          withCredentials: true,
        })
        .then((response) => {
          this.role = response.data.role;
          localStorage.setItem("role", this.role);
          this.$store.dispatch("setLogin", this.login);
          switch (this.role) {
            case "ADMIN":
              this.$router.push("/listeUtilisateursByAdmin");
              break;
            case "SUPERVISEUR":
              this.$router.push("/listeUtilisateursBySuperviseur");
              break;
            // case "AGENT":
            //   this.$router.push("/utilisateurs");
            //   break;
          }
          return response;
        })
        .catch((e) => {
          if (e.response.status === 401) {
            this.error = "Bad login or password";
            console.log("Unauthorized");
          } else {
            console.log(e);
          }
        });
    },
  },
};
</script>

<style scoped>
main {
  width: 80%;
  height: 90vh;
}
.input-group-text {
  border-radius: 2px 0 0 2px;
}
.btnSubmit {
  width: 60%;
}
.login-form-1 {
  background-color: #181A1B;
}
</style>