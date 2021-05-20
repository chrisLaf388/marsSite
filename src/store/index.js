import { createStore } from "vuex";

export default createStore({
    state(){
        return{
            login: localStorage.getItem("login"),
            motcle: localStorage.getItem("motcle")
        }
    },
    getters:{
        getLoginFromStore(state){
            return state.login;
        },
        //mot cle de redacteur chercheur - liste rapport
        getMotCleFromStore(state){
            return state.motcle
        }
    },
    actions:{
        setLogin(context, login){
            context.commit('changeLogin', login);
        },
        //mot cle de redacteur chercheur - liste rapport
        setMotCle(context, motcle){
            context.commit('changeMotCle', motcle);
        }
    },
    mutations:{
        changeLogin(state, login){
            // if user === null
            state.login = login;
            localStorage.setItem("login", state.login);
        },
        changeMotCle(state, motcle){
            state.motcle =motcle;
            localStorage.setItem("motcle", state.motcle);
        }
    }
})