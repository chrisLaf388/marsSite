import Login from "@/views/Login.vue";
import creerUtilisateur from "@/views/CreerUtilisateur.vue";
import listeUtilisateursByAdmin from "@/views/UtilisateursListeByAdmin.vue";
import listeUtilisateursBySuperviseur from "@/views/listeUtilisateurBySuperviseur.vue";
import accueilAgent from "@/views/accueilAgent.vue";
import modiferAgentByAgent from "@/views/modiferAgentByAgent.vue";
import modifierAgentBySuper from "@/views/modifierAgentBySuper";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/creerUtilisateur",
    name: "creerUtilisateur",
    component: creerUtilisateur,
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
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;