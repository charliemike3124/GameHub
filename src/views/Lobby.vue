<template>
  <v-container class="game-container game-container-sm">
    <div class="char-row ofy-hidden">
      <div class="char-column pa-0" v-for="character in lobby.characters" :key="character.id">
        <div class="char-container " data-aos="fade-up" >
          <CharacterGenerator class="ma-auto" :features="character.features" :width="70" :height="70"/>
          <div class="abs-center">
            <div class="name-box"><span>{{character.name}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <v-row>
      <v-col>
        <GameMode />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        Code: {{lobby.code}}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { CharacterGenerator, GameMode } from "@/components";
import { DB } from "@/services";
  export default {
    name: 'Lobby',

    components:{
      CharacterGenerator,
      GameMode
    },

    data: () => ({
    }),
    computed:{      
      ...mapState("lobby", ["lobby"]),
      ...mapState("character", ["characterId"]),
    },
    methods: {
      ...mapActions("lobby", ["SetLobby"]),
      onBeforeUnloadHandler(ev){
        if(ev){
          this.lobby.characters = this.lobby.characters.filter(char => char.id != this.characterId);
          DB.LobbyService.UpdateLobby(this.lobby.code, this.lobby);
        }
      },
      UpdateLobbyState(doc){
        this.SetLobby(doc.data());
      }
    },
    mounted(){
      DB.Hooks.OnSnapshot(this.UpdateLobbyState, this.lobby.code);
      addEventListener("beforeunload", this.onBeforeUnloadHandler);
      addEventListener("popstate", this.onBeforeUnloadHandler);      
    }
  }
</script>

<style lang="less">
 @import (less) "../styles/views/Home.less";
 @import (less) "../styles/views/Lobby.less";

</style>
