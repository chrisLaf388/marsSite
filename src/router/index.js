import Login from "@/views/Login.vue";
import creerAgent from "@/views/creerAgent.vue";
import listeUtilisateursByAdmin from "@/views/UtilisateursListeByAdmin.vue";
import listeUtilisateursBySuperviseur from "@/views/listeUtilisateurBySuperviseur.vue";
import accueilAgent from "@/views/accueilAgent.vue";
import modiferAgentByAgent from "@/views/modiferAgentByAgent.vue";
import modifierAgentBySuper from "@/views/modifierAgentBySuper";
import ficheCampagne from "@/views/ficheCampagne.vue";
import ficheAgent from "@/views/ficheAgent.vue";

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
    path: "/modifierAgentBySuper",
    name: "modifierAgentBySuper",
    component: modifierAgentBySuper,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;