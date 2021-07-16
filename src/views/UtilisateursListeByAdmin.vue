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
                @click="listeUtilisateurs('agent')"
              >
                <p class="m-0 d-flex align-items-center">Agents</p>
                <button class="btn" @click="createAgent('agent')">
                  <i
                    class="fas fa-plus"
                    :class="{
                      active: agentActive,
                      inactive: !agentActive,
                    }"
                  ></i>
                </button>
              </div>
            </li>
            <li
              class="nav-item"
              :class="{ active: superActive, inactive: !superActive }"
            >
              <div
                class="nav-link d-flex justify-content-between"
                @click="listeUtilisateurs('superviseur')"
              >
                <p class="m-0 d-flex align-items-center">
                  Superviseurs
                </p>
                <button
                  class="btn"
                  @click="createAgent('superviseur')"
                >
                  <i
                    class="fas fa-plus"
                    :class="{ active: superActive, inactive: !superActive }"
                  ></i>
                </button>
              </div>
            </li>
            <li
              class="nav-item"
              :class="{ active: campActive, inactive: !campActive }"
            >
              <div
                class="nav-link d-flex justify-content-between"
                @click="listeUtilisateurs('campagne')"
              >
                <p class="m-0 d-flex align-items-center">Campagnes</p>
                <button class="btn" @click="createAgent('campagne')">
                  <i
                    class="fas fa-plus"
                    :class="{ active: campActive, inactive: !campActive }"
                  ></i>
                </button>
              </div>
            </li>
          </ul>
          <div id="content">
            <div
              id="labels"
              class="d-flex justify-content-between px-1 mb-1 mt-4"
            >
              <p class="text-white mb-0">Nom</p>
              <p 
                v-if="superActive || agentActive" 
                class="text-white mb-0">
                Prénom
              </p>
              <p v-if="superActive || agentActive" class="text-white mb-0">Op en cours</p>
              <p v-if="superActive || agentActive" class="text-white mb-0">Langues</p>
              <p v-if="campActive" class="text-white mb-0">Date - Début</p>
              <p v-if="campActive" class="text-white mb-0">Date - Fin</p>
              <p v-if="campActive" class="text-white mb-0">Responsable</p>
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
                      <div class="conteneurInfos py-1 px-0">
                        <div v-if="superActive || agentActive"
                          class="infos d-flex justify-content-between"
                          @click="
                            ficheUtilisateur(utilisateur.email, getRoute())
                          "
                        >
                          <span>{{ utilisateur.nom }}</span>
                          <span>{{ utilisateur.prenom }}</span>
                        </div>
                        <div v-if="campActive"
                          class="infos d-flex justify-content-between"
                          @click="
                            ficheUtilisateur(utilisateur.numeroId, getRoute())
                          "
                        >
                          <span >{{ utilisateur.nom }}</span>
                          <span >{{ utilisateur.dateDebut }}</span>
                          <span >{{ utilisateur.dateFin }}</span>
                          <span >{{ utilisateur.responsable }}</span>
                        
                        </div>
                      </div>
                      <div class="boutons d_flex justify-content-end py-1 px-0">
                        <button v-if="superActive || agentActive"
                          class="mr-2 text-primary bg-white border-0"
                          @click="modifier(getRoute(), utilisateur.email)"
                        >
                          <i class="fas fa-pen"></i>
                        </button>
                        <button v-if="campActive"
                          class="mr-2 text-primary bg-white border-0"
                          @click="modifier(getRoute(), utilisateur.numeroId)"
                        >
                          <i class="fas fa-pen"></i>
                        </button>
                        <button
                        v-if="superActive || agentActive"
                          class="text-danger bg-white border-0"
                          @click="
                            supprimerUtilisateur(utilisateur.email, getRoute())
                          "
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                        <button
                        v-if="campActive"
                          class="text-danger bg-white border-0"
                          @click="
                            supprimerUtilisateur(utilisateur.numeroId, getRoute())
                          "
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
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
      agentActive: true,
      superActive: false,
      campActive: false,
    };
  },
  methods: {
    getRoute: function () {
      let route = "";
      if (this.superActive) {
        route = "superviseur";
      } else if (this.campActive) {
        route = "campagne";
      } else if (this.agentActive) {
        route = "agent";
      }
      return route;
    },
    getActive: function (route) {
      switch (route) {
        case "agent":
          this.agentActive = true;
          this.superActive = false;
          this.campActive = false;
          break;

        case "superviseur":
          this.agentActive = false;
          this.superActive = true;
          this.campActive = false;
          break;

        case "campagne":
          this.agentActive = false;
          this.superActive = false;
          this.campActive = true;
          break;
      }
      localStorage.setItem("agent", this.agentActive);
      localStorage.setItem("super", this.superActive);
      localStorage.setItem("campagne", this.campActive);
    },
    listeUtilisateurs: async function (route) {
      this.getActive(route);
      await axios
        .get("http://localhost:90/mars/" + route, {
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
    ficheUtilisateur: function (id, route) {
      console.log
      localStorage.setItem("agentId", id);
      localStorage.setItem("route", route);
      if (route === 'agent' || route === 'superviseur' ){
        this.$router.push("/ficheAgent");
      }
      else if (route === 'campagne'){
        this.$router.push("/ficheCampagne");
      }
    },
    createAgent: function (route) {
      this.getActive();
      if (route == 'agent'){
        localStorage.setItem("route", route);
        this.$router.push("/creerAgent");
      }
      else if (route == 'superviseur'){
        localStorage.setItem("route", route);
        this.$router.push("/creerSuperviseur");
      }
      else {
        localStorage.setItem("route", route);
        this.$router.push("/creerCampagne");
      }
    },
    modifier: function (route, id) {
      localStorage.setItem("utilisateurId", id);
      localStorage.setItem("route", route);
      if (route === 'agent' || route ==='superviseur')
        this.$router.push("/modifierAgentByAdmin");
      else
        this.$router.push("/modifierCampagneByAdmin");
      
      
    },
    supprimerUtilisateur: async function (id, route) {
      console.log(route);
      if (confirm("Voulez-vous vraiment supprimer cet utilisateur?")) {
        await axios("http://localhost:90/mars/" + route + "/" + id, {
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
  },
  mounted() {
    this.listeUtilisateurs("agent");
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
  width: 33.3%;
  cursor: pointer;
}

.infos {
  width: 67%;
}

span {
  width: 30%;
  white-space: nowrap;
  text-align: left;
}

.conteneurInfos {
  width: 90%;
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