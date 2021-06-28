import Login from "@/views/Login.vue";
import creerUtilisateur from "@/views/CreerUtilisateur.vue";
import listeUtilisateursByAdmin from "@/views/UtilisateursListeByAdmin.vue";
import listeUtilisateursBySuperviseur from "@/views/listeUtilisateurBySuperviseur.vue";
import acueilAgent from "@/views/acueilAgent.vue";

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
    path: "/acueilAgent",
    name: "acueilAgent",
    component: acueilAgent,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;