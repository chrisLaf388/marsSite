<template>
  <main class="mx-auto d-flex align-items-center">
    <div class="container login-container">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4 login-form-1 center px-5 py-4">
          <h3 class="text-center text-white mb-5">Welcome, </h3>
          <div class=".flex-column">
            <div class="p-3">
              <h4 class="text-primary">Insérer vos heures du matin :</h4>
              <label for="heureDebutMatin" class="text-white">Heure de Debut </label>
              <input  type="time" id="heureDebutMatin" name="heureDebutMatin"
                    min="07:00" max="20:00" required>
              <label for="heureFinMatin" class="text-white">Heure de Fin </label>
              <input class = "m-2" type="time" id="heureFinMatin" name="heureFinMatin"
                    min="07:00" max="20:00" required>
            </div>
            <div class="p-3">
              <h4 class="text-primary">Insérer vos heures de l'après midi :</h4>
              <label for="heureDebutAprem" class="text-white">Heure de Debut </label>
              <input type="time" id="heureDebutAprem" name="heureDebutAprem"
                    min="07:00" max="20:00" required>
              <label for="heureFinAprem" class="text-white">Heure de Fin </label>
              <input class = "m-2" type="time" id="heureFinAprem" name="heureFinAprem"
                    min="07:00" max="20:00" required>
            </div>
          </div>
          <button                 
            class="btn btnSubmit d-block m-auto rounded-pill bg-transparent text-primary px-3 py-2 border-primary fs-5">
            Envoyer ses heures
          </button>
          <button @click.prevent="goToModifierAgent" 
            class="btn btnSubmit d-block m-auto rounded-pill bg-transparent text-primary px-3 py-2 border-primary fs-5">
            Modifier profil
          </button>
        </div>
        <div class="col-4"></div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      role: "",
      login: "",
      password: "",
      error: null,
    };
  },
  methods: { 
    goToModifierAgent:function(){
      this.$router.push("/modiferAgentByagent");
    }
  }
}
</script>

<style scoped>
main {
  width: 80%;
  height: 90vh;
}
.input-group-text {
  border-radius: 2px 0 0 2px;
}
.btnSubmit {
  width: 60%;
}
.login-form-1 {
  background-color: #181A1B;
}
</style>