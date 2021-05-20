<template>
  <main class="mx-auto d-flex align-items-center">
    <div class="container login-container">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6 login-form-1 center px-5 py-4">
          <h3 class="text-center text-white mb-5">Créer un congé</h3>
            <form @submit.prevent="creerConge()">
                <div class="form-group row">
                    <div class="d-flex justify-content-around">
                        <p class="text-white">Jour de vacances restant :</p>
                        <p class="text-white">10</p>
                    </div>
                    <div class="form-group row">
                        <p class="col-6 d-flex flex-column">
                         <label class="text-white">Date de début du congé :</label>
                            <input
                            type="date"
                            name="date"
                            id="dateDebutConge"
                            placeholder="Date début"
                            v-model="dateDebutConge"
                            />
                        </p>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-group row">
                        <p class="col-6 d-flex flex-column">
                         <label class="text-white">Date de fin du congé :</label>
                            <input
                            type="date"
                            name="date"
                            id="dateFinConge"
                            placeholder="Date fin"
                            v-model="dateFinConge"
                            />
                        </p>
                    </div>
                </div>

                <button>Envoyer</button>
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
      login: "",
      password: "",
      nom: "",
      prenom: "",
      adresse: "",
      codePostal: "",
      ville: "",
      dateNaissance: "",
    };
  },
  methods: {
    creerUtilisateur: async function () {
      switch (localStorage.getItem("route")) {
        case "visiteur":
          await axios("http://localhost:3002/gsb/visiteur", {
            method: "POST",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              password: this.password,
              visiteur: {
                login: this.login,
                nom: this.nom,
                prenom: this.prenom,
                adresse: this.adresse,
                codePostal: this.codePostal,
                ville: this.ville,
                dateNaissance: this.dateNaissance,
              },
            },
          }).then((response) => {
            let data = response.data;
            localStorage.setItem("utilisateurId", data.login);
            this.$router.push("/ficheUtilisateur");
          });
          break;

        case "redacteurchercheur":
          await axios("http://localhost:3002/gsb/redacteurchercheur", {
            method: "POST",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              password: this.password,
              redacteurChercheur: {
                login: this.login,
                nom: this.nom,
                prenom: this.prenom,
                adresse: this.adresse,
                codePostal: this.codePostal,
                ville: this.ville,
                dateNaissance: this.dateNaissance,
              },
            },
          }).then((response) => {
            let data = response.data;
            localStorage.setItem("utilisateurId", data.login);
            this.$router.push("/ficheUtilisateur");
          });
          break;

        case "rh":
          await axios("http://localhost:3002/gsb/rh", {
            method: "POST",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              password: this.password,
              rh: {
                login: this.login,
                nom: this.nom,
                prenom: this.prenom,
                adresse: this.adresse,
                codePostal: this.codePostal,
                ville: this.ville,
                dateNaissance: this.dateNaissance,
              },
            },
          }).then((response) => {
            let data = response.data;
            localStorage.setItem("utilisateurId", data.login);
            this.$router.push("/ficheUtilisateur");
          });
          break;
      }
    },
    annuler: function () {
      this.$router.push("/utilisateurs");
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