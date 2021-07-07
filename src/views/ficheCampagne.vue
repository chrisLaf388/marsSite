<template>
  <main class="mx-auto d-flex align-items-center">
    <div class="container login-container">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4 login-form-1 px-5 py-4">
          <h3 class="text-center text-white mb-5">Fiche Campagne</h3>
          <div>
            <p class="text-white">
              Nom : <span id="nom">{{ nom }}</span>
            </p>
            <p class="text-white">
              Date de Début : <span id="prenom">{{ dateDebut }}</span>
            </p>
            <p class="text-white">
              Date de Fin : <span id="adresse">{{ dateFin }}</span>
            </p>
            <p class="text-white">
              Responsable : <span id="cp">{{ responsable }}</span>
            </p>
            <p class="text-white">
              Agents : <span id="ville">{{ agents }}</span>
            </p>
            
          </div>
          <div class="form-group d-flex mt-4 justify-content-around">
            <button
              id="Annuler"
              class="d-block m-auto rounded-pill bg-transparent text-danger px-3 py-2 border-danger fs-5"
              @click="annuler()"
            >
              Annuler
            </button>
          </div>
        </div>
        <div class="col-4"></div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "FicheRapportVisiteur",
  data() {
    return {
      nom: "",
      dateDebut:"",
      dateFin:"",
      responsable: "",
    };
  },
  methods: {
    afficherFiche: async function () {
      await axios
        .get(
          "http://localhost:90/mars/campagne/"+localStorage.getItem("campagneId"),
          {
            withCredentials: true,
          }
        )
        .catch((e) => {
          console.log(e);
        })
        .then((response) => {
            console.log(response.data);
          this.nom = response.data.nom;
          this.dateDebut = response.data.dateDebut;
          this.dateFin = response.data.dateFin;
          this.responsable = response.data.responsable;
        });
    },
    getRole: async function () {
      if (localStorage.getItem("rc") === "true") {
        this.role = "Rédacteur/Chercheur";
      } else if (localStorage.getItem("rh") === "true") {
        this.role = "Ressources humaines";
      } else if (localStorage.getItem("vis") === "true") {
        this.role = "Visiteur";
      }
      return this.role;
    },
    rediriger: function () {
      this.$router.push("/modifierUtilisateur");
    },
    annuler: function () {
        this.$router.push("/listeUtilisateursBySuperviseur");
      
    },
  },
  mounted() {
    this.afficherFiche();
    this.getRole();
  },
};
</script>

<style scoped>
main {
  width: 80%;
  height: 90vh;
}

button {
  width: 49%;
}

.login-form-1 {
  background-color: rgba(0, 0, 0, 0.37);
}

p {
  font-weight: bold;
  text-align: left !important;
}

span {
  font-weight: normal;
}
</style>