<template>
  <main class="mx-auto d-flex align-items-center">
    <div class="container login-container">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6 login-form-1 center px-5 py-4">
          <h3 class="text-center text-white mb-5">Créer une Campagne</h3>
          <form @submit.prevent="creerAgent()">
            <div class="form-group row">
              <p class="col-6 d-flex flex-column">
                <label class="text-white">Nom :</label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  placeholder="nom"
                  v-model="nom"
                />
              </p>
              <p class="col-6 d-flex flex-column">
                
                <label class="text-white">Date début:</label>
                <input
                  type="date"
                  name="dateDebut"
                  id="dateDebut"
                  v-model="dateDebut"
                />
              </p>
            </div>
            <div class="form-group row">
              <p class="col-6 d-flex flex-column">
                <label class="text-white">Date Fin:</label>
                <input
                  type="date"
                  name="dateFin"
                  id="dateFin"
                  v-model="dateFin"
                />
              </p>
              <p class="col-6 d-flex flex-column">
                <label class="text-white">Responsable :</label>
                <input
                  type="text"
                  name="responsable"
                  id="responsable"
                  placeholder="responsable"
                  v-model="responsable"
                />
              </p>
            </div>
            <div class="form-group">
              <p id="listeAgent" class="d-flex flex-column">
                <label class="text-white">Liste agents :</label>
                <input
                  class="w-100"
                  coltype="text"
                  name="listeAgent"
                  id="listeAgent"
                  placeholder="listeAgent"
                  v-model="listeAgent"
                />
              </p>
            </div>
            <div class="form-group d-flex mt-4">
              <button
                type="submit"
                id="creer"
                class="btnSubmit d-block m-auto rounded-pill bg-transparent text-primary px-3 py-2 border-primary fs-5"
              >
                Créer
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
  name: "CreerUtilisateur",
  data() {
    return {
      nom: "",
      dateDebut: "",
      dateFin: "",
      responsable: "",
      listeAgent: "",
    };
  },
  methods: {
    creerAgent: async function () {
      await axios("http://localhost:90/mars/campagne/", {
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          nom: this.nom,
          dateDebut: this.dateDebut,
          dateFin: this.dateFin,
          responsable: this.responsable,
        },
      })
      this.$router.push("/listeUtilisateursByAdmin");    
      
    },
    annuler: function () {
      this.$router.push("/listeUtilisateursByAdmin");
    },
  },
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