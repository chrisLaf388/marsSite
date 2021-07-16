import Login from "@/views/Login.vue";
import creerAgent from "@/views/creerAgent.vue";
import listeUtilisateursByAdmin from "@/views/UtilisateursListeByAdmin.vue";
import listeUtilisateursBySuperviseur from "@/views/listeUtilisateurBySuperviseur.vue";
import accueilAgent from "@/views/accueilAgent.vue";
import modiferAgentByAgent from "@/views/modiferAgentByAgent.vue";
import modifierAgentByAdmin from "@/views/modifierAgentByAdmin.vue";
import modifierCampagneByAdmin from "@/views/modifierCampagneByAdmin.vue"
import ficheCampagne from "@/views/ficheCampagne.vue";
import ficheAgent from "@/views/ficheAgent.vue";
import creerCampagne from "@/views/creerCampagne.vue";
import creerSuperviseur from "@/views/creerSuperviseur.vue"


import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/creerAgent",
    name: "creerAgent",
    component: creerAgent,
  },
  {
    path: "/listeUtilisateursByAdmin",
    name: "listeUtilisateursByAdmin",
    component: listeUtilisateursByAdmin,
  },
  {
    path: "/listeUtilisateursBySuperviseur",
    name: "listeUtilisateursBySuperviseur",
    component: listeUtilisateursBySuperviseur,
  },
  {
    path: "/accueilAgent",
    name: "accueilAgent",
    component: accueilAgent,
  },
  {
    path: "/modiferAgentByAgent",
    name: "modiferAgentByAgent",
    component: modiferAgentByAgent,
  },
  {
    path: "/modifierAgentByAdmin",
    name: "modifierAgentByAdmin",
    component: modifierAgentByAdmin,
  },
  {
    path: "/ficheCampagne",
    name: "ficheCampagne",
    component: ficheCampagne,
  },
  {
    path: "/ficheAgent",
    name: "ficheAgent",
    component: ficheAgent,
  },
  {
    path: "/creerCampagne",
    name: "creerCampagne",
    component: creerCampagne,
  },
  {
    path: "/creerSuperviseur",
    name: "creerSuperviseur",
    component: creerSuperviseur,
  },
  {
    path: "/modifierCampagneByAdmin",
    name: "modifierCampagneByAdmin",
    component: modifierCampagneByAdmin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;