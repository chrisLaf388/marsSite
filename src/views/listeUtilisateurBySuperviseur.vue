<template>
  <main class="mx-auto d-flex align-items-center">
    <div class="container login-container">
      <div class="row">
        <div class="col-12 login-form-1 center px-0 py-0">
          <ul class="nav nav-tabs">
            <li 
              class="nav-item" 
              :class="{ active: agentActive, inactive: !agentActive }"
            >
              <div
                class="nav-link d-flex justify-content-between"
                @click="listeAgents('agent')"
              >  
                <p>Agents</p>
              </div>
            </li>
            <li class="nav-item"
              :class="{ active: campagneActive, inactive: !campagneActive }"
            >
              <div
                class="nav-link d-flex justify-content-between"
                @click="listeCampagnes('campagnes')"
              >
                <p>Campagnes</p>
              </div>             
            </li>
          </ul>
            
          <div id="content">
            <div
              id="labels"
              class="d-flex justify-content-between px-1 mb-1 mt-4"
            >
              <p v-if="agentActive" class="text-white mb-0">Vac.</p>
              <p v-if="agentActive" class="text-white mb-0">Nom</p>
              <p v-if="agentActive" class="text-white mb-0">Prenom</p>
              <p v-if="agentActive" class="text-white mb-0">Op en cours</p>
              <p v-if="agentActive" class="text-white mb-0">Langues</p>

              <p v-if="campagneActive" class="text-white mb-0">Nom</p>
              <p v-if="campagneActive" class="text-white mb-0">Date - début</p>
              <p v-if="campagneActive" class="text-white mb-0">Date - fin</p>
              <p v-if="campagneActive" class="text-white mb-0">Responsable</p>
            </div>
            <div>
              <ul id="visiteurs" class="p-0 m-0">
                <li
                  v-for="utilisateur in utilisateurs"
                  :key="utilisateur.login"
                >
                  <div class="card mb-1">
                    <div
                      class="card-body d-flex justify-content-between py-0 px-1"
                    >
                      <div class="conteneurInfos  py-1 px-0">
                        <div
                          class="d-flex justify-content-between"
                          @click="
                            ficheUtilisateur(utilisateur.numeroId)
                          "
                        >
                          <span>
                            {{ utilisateur.nom }}
                            <!-- {{ utilisateur.prenom }} -->
                            
                            
                          </span>
                          <span>{{utilisateur.dateDebut}}</span>
                          <span>{{utilisateur.dateFin}}</span>
                          <span>{{utilisateur.responsable}}</span>
                          <!-- <span>{{ utilisateur.adresse }}</span> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "ListeUtilisateurs",
  data() {
    return {
      utilisateurs: null,
      agentActive: false,
      campagneActive: true,
      
    };
  },
  methods: {
    
    listeUtilisateurs: async function () {
      await axios
        .get("http://localhost:90/mars/campagne", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .catch((e) => {
          console.log(e);
        })
        .then((response) => {
          this.utilisateurs = response.data;          
        });
    },
    // a revoir
    ficheUtilisateur: function (id) {
      console.log(id);
      localStorage.setItem("campagneId", id);
      this.$router.push("/ficheCampagne");
    },
    modifier: function (id) {
      this.$store.dispatch("setLogin", id);
      this.$router.push("/modiferAgent");
    },
    supprimerUtilisateur: async function (id) {
      if (confirm("Voulez-vous vraiment supprimer cet utilisateur?")) {
        
        await axios("http://localhost:90/mars/agent/" + id, {
          method: "DELETE",
          withCredentials: true,
        });
        window.location.reload();
      }
    },
    getFicheUtilisateur: function (e, route) {
      let value = e.target.value;
      localStorage.setItem("utilisateurId", value);
      localStorage.setItem("route", route);
      this.$router.push("/ficheUtilisateur");
    },
    gotoCreerAgent: function () {
      this.$router.push("/creerUtilisateur");
    },
  },
  
  mounted() {
    this.listeUtilisateurs();
  },
};
</script>

<style scoped>
main {
  width: 100%;
  height: 90vh;
}

.active {
  color: black;
  background-color: white;
}

.inactive {
  color: white;
}

.login-form-1 {
  background-color: rgba(0, 0, 0, 0.37);
  height: 70vh;
}

#labels {
  font-weight: bold;
  width: 100%;
}

li {
  list-style: none;
}

.nav-item {
  width: 50%;
  cursor: pointer;
}

.infos {
  width: 100%;
}

span {
  width: 12%;
  white-space: nowrap;
  text-align: left;
}

.conteneurInfos {
  width: 100%;
  cursor: pointer;
}

.boutons {
  width: 10%;
}

button {
  width: fit-content;
}

i {
  cursor: pointer;
}
</style>