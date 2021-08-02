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
                @click="liste('agent')"
              >  
                <p>Agents</p>
              </div>
            </li>
            <li class="nav-item"
              :class="{ active: campagneActive, inactive: !campagneActive }"
            >
              <div
                class="nav-link d-flex justify-content-between"
                @click="liste('campagne')"
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
                          v-if="campagneActive"
                          class="d-flex justify-content-between"
                          @click="
                            ficheUtilisateur(utilisateur.numeroId, 'campagne')
                          "
                        >
                          <span>{{ utilisateur.nom }}</span>
                          <span>
                            {{ utilisateur.prenom }}
                          </span>
                          <span>{{utilisateur.dateDebut}}</span>
                          <span>{{utilisateur.dateFin}}</span>
                          <span>{{utilisateur.responsable}}</span>
                          
                        </div>
                        <div 
                          v-if="agentActive"
                          class="d-flex justify-content-between"
                          @click="
                            ficheUtilisateur(utilisateur.email, 'agent')
                          "
                        >
                          <span>
                            {{ utilisateur.nom }}
                          </span>
                          <span>
                            {{ utilisateur.prenom }}
                          </span>                          
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
  name: "ListeBySuperviseur",
  data() {
    return {
      utilisateurs: null,
      agentActive: false,
      campagneActive: true,
      
    };
  },
  methods: {
    liste: async function (route) {
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
    getActive: function (route) {
      switch (route) {
        case "agent":
          this.agentActive = true;
          this.campagneActive = false;
          break;

        case "campagne":
          this.agentActive = false;
          this.campagneActive = true;
          break;
      }
    },
    ficheUtilisateur: function (id, route) {
      localStorage.setItem("route");
      if (route === 'agent')
      {
        localStorage.setItem("agentId", id);
        this.$router.push("/ficheAgent");
      }
      else if (route === 'campagne')
      {
        localStorage.setItem("campagneId", id);
        this.$router.push("/ficheCampagne");
      }
    },
    gotoCreerAgent: function () {
      this.$router.push("/creerUtilisateur");
    },
  },
  
  mounted() {
    this.liste('campagne');
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