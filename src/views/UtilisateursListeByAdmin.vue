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
                  @click="createUtilisateur('superviseur')"
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
                @click="listeUtilisateurs('camp')"
              >
                <p class="m-0 d-flex align-items-center">Campagnes</p>
                <button class="btn" @click="createUtilisateur('camp')">
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
              <p class="text-white mb-0">Prénom</p>
              <p class="text-white mb-0">Op en cours</p>
              <p class="text-white mb-0">Langues</p>
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
                        <div
                          class="infos d-flex justify-content-between"
                          @click="
                            ficheUtilisateur(utilisateur.login)
                          "
                        >
                          <span
                            >{{ utilisateur.nom }}
                            {{ utilisateur.prenom }}</span
                          >
                          <span>{{ utilisateur.dateEmbauche }}</span>
                        </div>
                      </div>
                      <div class="boutons d_flex justify-content-end py-1 px-0">
                        <button
                          class="mr-2 text-primary bg-white border-0"
                          @click="modifier(utilisateur.login)"
                        >
                          <i class="fas fa-pen"></i>
                        </button>
                        <button
                          class="text-danger bg-white border-0"
                          @click="
                            supprimerUtilisateur(utilisateur.login)
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
      <div class = "d-flexs">
        <button
                  type="submit"
                  id="annuler"
                  class="btnSubmit d-block m-auto rounded-pill bg-transparent text-white px-3 py-2 border-white fs-5"
                  @click="annuler()"
                >
                  Creer un Agent
                </button>
        <button
                  type="submit"
                  id="annuler"
                  class="btnSubmit d-block m-auto rounded-pill bg-transparent text-white px-3 py-2 border-white fs-5"
                  @click="annuler()"
                >
                  Creer une OP
                </button>
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
        route = "rh";
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

        case "camp":
          this.agentActive = false;
          this.superActive = false;
          this.campActive = true;
          break;
      }
      localStorage.setItem("agent", this.agentActive);
      localStorage.setItem("super", this.superActive);
      localStorage.setItem("camp", this.campActive);
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
      localStorage.setItem("utilisateurId", id);
      localStorage.setItem("route", route);
      this.$router.push("/ficheUtilisateur");
    },
    createAgent: function (route) {
      this.getActive();
      localStorage.setItem("route", route);
      this.$router.push("/creerAgent");
    },
    modifier: function (id, route) {
      localStorage.setItem("utilisateurId", id);
      localStorage.setItem("route", route);
      this.$router.push("/modifierUtilisateur");
    },
    supprimerUtilisateur: async function (id, route) {
      if (confirm("Voulez-vous vraiment supprimer cet utilisateur?")) {
        await axios("http://localhost:3002/gsb/" + route + "/" + id, {
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