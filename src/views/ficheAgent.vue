<template>
  <main class="mx-auto d-flex align-items-center">
    <div class="container login-container">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4 login-form-1 px-5 py-4">
          <h3 class="text-center text-white mb-5">Fiche Agent</h3>
          <div>
            <p class="text-white">
              email : <span id="nom">{{ email }}</span>
            </p>
            <p class="text-white">
              Nom : <span id="nom">{{ nom }}</span>
            </p>
            <p class="text-white">
              prenom : <span id="prenom">{{ prenom }}</span>
            </p>
            <p class="text-white">
              adresse : <span id="adresse">{{ adresse }}</span>
            </p>
            <p class="text-white">
              codePostale : <span id="cp">{{ codePostale }}</span>
            </p>
            <p class="text-white">
              ville : <span id="ville">{{ ville }}</span>
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
      email:"",
      nom: "",
      prenom:"",
      adresse:"",
      codePostale: "",
      ville:"",
    };
  },
  methods: {
    
    afficherFiche: async function () {
      await axios
        .get(
          "http://localhost:90/mars/"+localStorage.getItem('route')+"/"+ localStorage.getItem('agentId'),
          {
            withCredentials: true,
          }
        )
        .catch((e) => {
          console.log(e);
        })
        .then((response) => {
          console.log(response.data);
          this.email = response.data.email;
          this.nom = response.data.nom;
          this.prenom = response.data.prenom;
          this.adresse = response.data.adresse;
          this.codePostale = response.data.codePostale;
          this.ville = response.data.ville;
        });
    },
    annuler: function () {
      if(localStorage.getItem('route')!='')
        this.$router.push("/listeUtilisateursByAdmin");
      else
        this.$router.push("/listeUtilisateursBySuperviseur");
    },
  },
  mounted() {
    this.afficherFiche();
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