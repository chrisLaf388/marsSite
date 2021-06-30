<template>
  <main class="mx-auto d-flex align-items-center">
    <div class="container login-container">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4 login-form-1 center px-5 py-4">
          <h3 class="text-center text-white mb-5">Welcome, </h3>
          <div class=".flex-column">
            <label for="heureDebut" class="text-white">Heure de Debut :</label>
            <input type="time" id="heureDebut" name="heureDebut"
                  min="07:00" max="20:00" required>
            <label for="heureFin" class="text-white">Heure de Fin :</label>
            <input type="time" id="heureFin" name="heureFin"
                  min="07:00" max="20:00" required>
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
      this.$router.push("/modiferAgent");
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