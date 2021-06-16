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

    <!--LOBBY-->
    <div class="max-height gm-cont" :class="lobbyContClass">
      <v-row>
        <v-col cols="1">
          <v-divider/>
        </v-col>
        <v-col cols="1" class="p-rel">
          <div class="p-abs gm-title"><span>Game Modes</span></div>
        </v-col>
        <v-col>
          <v-divider/>
        </v-col>
      </v-row>
      <v-row class="mt-3 gm-wrapper" align-content="start">
        <v-col
          class="pa-1"
          v-for="(mode,i) in gameModes"
          :key="i"
          lg="4"
          md="6"
          sm="6"
          cols="12"
        >
              <GameMode data-aos="flip-left" data-aos-duration="1200" :data-aos-delay="200*i" v-bind="mode"/>
        </v-col>
      </v-row>
      <v-row data-aos="fade-up">
        <v-col class="text-center">
        <v-divider/>
          <v-btn class="mt-6" @click="startGame">Play</v-btn>
        </v-col>
      </v-row>
      <v-row data-aos="fade-up" data-aos-offset="-300">
        <v-col class="text-center">
          Code: {{lobby.code}}
        </v-col>
      </v-row>
    </div>
    <!--GAME-->
    <div class="max-height" v-if="gameStarted">
      <component :is="KeyDestroyer"></component>
    </div>

  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { CharacterGenerator, GameMode, KeyDestroyer } from "@/components";
import { DB } from "@/services";
import GameModes from "@/resources/GameModes"

  export default {
    name: 'Lobby',

    components:{
      CharacterGenerator,
      GameMode,
      KeyDestroyer
    },

    data: () => ({
      gameModes: null,
      selectedGameMode: null,
      gameStarted: false
    }),
    computed:{      
      ...mapState("lobby", ["lobby", "selectedMode"]),
      ...mapState("character", ["characterId"]),
      lobbyContClass(){
        let _class = "";
        if(this.gameStarted){
          _class = "opacity-0";
        }
        return _class;
      }
    },
    methods: {
      ...mapActions("lobby", ["SetLobby", "SetSelectedMode"]),
      onBeforeUnloadHandler(ev){
        if(ev){
          this.lobby.characters = this.lobby.characters.filter(char => char.id != this.characterId);
          DB.LobbyService.UpdateLobby(this.lobby.code, this.lobby);
        }
      },
      UpdateLobbyState(doc){
        this.SetLobby(doc.data());
      },
      startGame(){
        this.gameStarted = true;
      }
    },
    mounted(){
      DB.Hooks.OnSnapshot(this.UpdateLobbyState, this.lobby.code);
      addEventListener("beforeunload", this.onBeforeUnloadHandler);
      addEventListener("popstate", this.onBeforeUnloadHandler);      
      this.gameModes = GameModes;
      if(!!this.selectedGameMode){
        this.SetSelectedMode(this.gameModes[0]);
      }
    }
  }
</script>

<style lang="less">
 @import (less) "../styles/views/Home.less";
 @import (less) "../styles/views/Lobby.less";

</style>
