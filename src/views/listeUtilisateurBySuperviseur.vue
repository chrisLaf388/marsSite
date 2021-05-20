<template>
  <main class="mx-auto d-flex align-items-center">
    <div class="container login-container">
      <div class="row">
        <div class="col-12 login-form-1 center px-0 py-0">
          <p class="text-white">Agents</p>  
          <div id="content">
            <div
              id="labels"
              class="d-flex justify-content-between px-1 mb-1 mt-4"
            >
              <p class="text-white mb-0">Vac.</p>
              <p class="text-white mb-0">Nom</p>
              <p class="text-white mb-0">Prenom</p>
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
                            ficheUtilisateur(utilisateur.login, getRoute())
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
                          @click="modifier(utilisateur.login, getRoute())"
                        >
                          <i class="fas fa-pen"></i>
                        </button>
                        <button
                          class="text-danger bg-white border-0"
                          @click="
                            supprimerUtilisateur(utilisateur.login, getRoute())
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
        <button class="btnSubmit d-block m-auto rounded-pill bg-transparent text-white px-3 py-2 border-white fs-5">
              Créer un agent
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
      visiteurActive: true,
      rcActive: false,
      rhActive: false,
    };
  },
  methods: {
    getRoute: function () {
      let route = "";
      if (this.rcActive) {
        route = "redacteurchercheur";
      } else if (this.rhActive) {
        route = "rh";
      } else if (this.visiteurActive) {
        route = "visiteur";
      }
      return route;
    },
    getActive: function (route) {
      switch (route) {
        case "visiteur":
          this.visiteurActive = true;
          this.rcActive = false;
          this.rhActive = false;
          break;

        case "redacteurchercheur":
          this.visiteurActive = false;
          this.rcActive = true;
          this.rhActive = false;
          break;

        case "rh":
          this.visiteurActive = false;
          this.rcActive = false;
          this.rhActive = true;
          break;
      }
      localStorage.setItem("vis", this.visiteurActive);
      localStorage.setItem("rh", this.rhActive);
      localStorage.setItem("rc", this.rcActive);
    },
    listeUtilisateurs: async function (route) {
      this.getActive(route);
      await axios
        .get("http://localhost:3002/gsb/" + route, {
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
    createUtilisateur: function (route) {
      this.getActive();
      localStorage.setItem("route", route);
      this.$router.push("/creerUtilisateur");
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
    this.listeUtilisateurs("visiteur");
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