import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persist";
import {
  lobby,
  character
} from "./modules";


const vuexLocalStorage = new VuexPersist({
  storage: window.localStorage,
  reducer: (state) => ({
    character: state.character,
    lobby: state.lobby
  }),
});

Vue.use(Vuex);

export default new Vuex.Store({  
  plugins: [vuexLocalStorage.plugin],
  modules: {
    lobby,
    character
  }
})
