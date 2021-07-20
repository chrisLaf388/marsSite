<template>
  <main class="mx-auto d-flex align-items-center">
    <div class="container login-container">
      <div class="row">
        <div class="col-3 login-form-1 center px-5 py-4">
          <form @submit.prevent="ajoutLangue()">
            <h4>Langues : </h4>
            <input type="text" v-model="langue">
            <button>Envoyer</button>
            <ul>
              <li v-for="langue in langues" :key="langue.id">
                {{ langue }}
              </li>
            </ul>
            <button @click="supprimerLangues">Delete button</button>
          </form>
        </div>
        <div class="col-6 login-form-1 center px-5 py-4">
          <h3 class="text-center text-white mb-5">Modifier votre Profil Agent</h3>
          <form @submit.prevent="modifierAgent()">
            <div class="form-group row">
              <p class="col-6 d-flex flex-column">
                <label class="text-white">Login:</label>
                <input
                  type="text"
                  name="login"
                  id="login"
                  placeholder="Login"
                  v-model="login"
                />
              </p>
            </div>
            <div class="form-group row">
              <p class="col-6 d-flex flex-column">
                <label class="text-white">Nom:</label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  placeholder="Nom"
                  v-model="nom"
                />
              </p>
              <p class="col-6 d-flex flex-column">
                <label class="text-white">Prénom:</label>
                <input
                  type="text"
                  name="prenom"
                  id="prenom"
                  placeholder="Prénom"
                  v-model="prenom"
                />
              </p>
            </div>
            <div class="form-group">
              <p id="parAdresse" class="d-flex flex-column">
                <label class="text-white">Adresse:</label>
                <input
                  class="w-100"
                  coltype="text"
                  name="adresse"
                  id="adresse"
                  placeholder="Adresse"
                  v-model="adresse"
                />
              </p>
            </div>
            <div class="form-group row">
              <p class="col-6 d-flex flex-column">
                <label class="text-white">Code postal:</label>
                <input
                  type="text"
                  name="CP"
                  id="CP"
                  placeholder="Code Postal"
                  v-model="codePostal"
                />
              </p>
              <p class="col-6 d-flex flex-column">
                <label class="text-white">Ville:</label>
                <input
                  type="text"
                  name="ville"
                  id="ville"
                  placeholder="Ville"
                  v-model="ville"
                />
              </p>
            </div>
            
            <div class="form-group d-flex mt-4">
              <button
                type="submit"
                id="creer"
                class="btnSubmit d-block m-auto rounded-pill bg-transparent text-primary px-3 py-2 border-primary fs-5"
              >
                Modifier
              </button>
              <button
                type="submit"
                id="annuler"
                class="btnSubmit d-block m-auto rounded-pill bg-transparent text-danger px-3 py-2 border-danger fs-5"
                @click="annuler()"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "modifierAgent",
  data() {
    return {
      login: "",
      password: "",
      nom: "",
      prenom: "",
      adresse: "",
      codePostal: "",
      ville: "",
      langue:"",
    };
  },
  methods: {
    modifierAgent: async function () {
      await axios("http://localhost:90/mars/agent/"+ this.$store.getters.getLoginFromStore, {
        method: "PUT",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: this.login,
          nom: this.nom,
          prenom: this.prenom,
          adresse: this.adresse,
          codePostale: this.codePostal,
          ville: this.ville,
        },
      })
      this.$router.push("/accueilAgent");
    },
    // Probleme car renvois tjs sur accueil agent et non chez superviseur
    annuler: function () {
      this.$router.push("/accueilAgent");
    },
    ajoutLangue:async function(){
      await axios("http://localhost:90/mars/agent/"+ this.$store.getters.getLoginFromStore+"/langue?langue="+this.langue, {
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
    supprimerLangues: async function(){
      await axios("http://localhost:90/mars/agent/"+ this.$store.getters.getLoginFromStore+"/langue", {
        method: "DELETE",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    },
    aficherLangues: async function(){
      await axios("http://localhost:90/mars/agent/"+ this.$store.getters.getLoginFromStore, {
        method: "GET",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((e) => {
        console.log(e);
        })
      .then((response) => {
        this.langues = response.data.langues;
        console.log(this.langues);
      });
    },
  },
  mounted(){
    this.aficherLangues
  }
};
</script>

<style scoped>
main {
  width: 80%;
  height: 90vh;
}

.login-form-1 {
  background-color: rgba(0, 0, 0, 0.37);
}

button {
  width: 40%;
}
</style>