<template>
  <main class="mx-auto d-flex align-items-center">
    <div class="container login-container">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4 login-form-1 center px-5 py-4">
          <h3 class="text-center text-white mb-5">Merci de vous connecter.</h3>
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
          <form @submit.prevent="loginRequest">
            <div class="form-group">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="fas fa-user-circle mt-1 mb-1"></i>
                  </div>
                </div>
                <input
                  type="text"
                  class="form-control inlineFormInputGroup"
                  id="login"
                  placeholder="Your login"
                  v-model="login"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i class="fas fa-lock mt-1 mb-1"></i>
                  </div>
                </div>
                <input
                  type="password"
                  class="form-control mb-3 inlineFormInputGroup"
                  id="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  v-model="password"
                />
              </div>
            </div>
            <div class="form-group">
              <button
                type="submit"
                id="connexion"
                class="btn btnSubmit d-block m-auto rounded-pill bg-transparent text-primary px-3 py-2 border-primary fs-5"
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
        <div class="col-4"></div>
      </div>
    </div>
  </main>
</template>

<script>
// import axios from "axios";

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
    // loginRequest: async function () {
    //   const credential = window.btoa(this.login + ":" + this.password);

    //   await axios
    //     .get("http://localhost:3002/gsb/login", {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Basic " + credential,
    //       },
    //       withCredentials: true,
    //     })
    //     .then((response) => {
    //       this.role = response.data.role;
    //       localStorage.setItem("role", this.role);
    //       this.$store.dispatch("setLogin", this.login);
    //       switch (this.role) {
    //         case "VIS":
    //           this.$router.push("/rapportsVisiteur");
    //           break;
    //         case "RC":
    //           this.$router.push("/rapportRedacteurListe");
    //           break;
    //         case "RH":
    //           this.$router.push("/utilisateurs");
    //           break;
    //       }
    //       return response;
    //     })
    //     .catch((e) => {
    //       if (e.response.status === 401) {
    //         this.error = "Bad login or password";
    //         console.log("Unauthorized");
    //       } else {
    //         console.log(e);
    //       }
    //     });
    // },
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