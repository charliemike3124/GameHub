<template>
  <v-container class="game-container game-container-sm">
    <div class="char-row ofy-hidden">
      <div class="char-column pa-0" v-for="character in lobby.characters" :key="character.id">
        <div class="char-container " data-aos="fade-up" >
          <CharacterGenerator class="ma-auto" :features="character.features" :width="70" :height="70"/>
          <div class="abs-center">
            <div class="name-box">
              <span>{{character.name}}</span>
              <v-badge
                v-if="lobby.hostId == character.id"
                bordered
                offset-x="15"
                offset-y="-50"
                class="host-badge"
                color="yellow darken-3"
                icon="mdi-crown"
              >
              </v-badge>
              <v-badge
                v-if="lobby.hasStarted"
                bordered
                offset-x="15"
                offset-y="-15"
                class="score-badge"
                color="blue"
                :content="character.score || '0'"
                label="score"
              >
              </v-badge>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--LOBBY-->
    <div class="max-height gm-cont" :class="lobbyContClass" v-if="!gameStarted">
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
              <GameMode data-aos="flip-left" data-aos-duration="1200" :data-aos-delay="200*i" 
              v-bind="mode"
              :isHost="isHost"/>
        </v-col>
      </v-row>
      
      <v-row data-aos="fade-up">
        <v-col class="text-center">
        <v-divider/>
          <v-btn v-if="isHost" class="mt-6" @click="startGame">Play</v-btn>
          <div v-else class="mt-4">The lobby host is chosing the game mode.</div>
        </v-col>
      </v-row>
      <v-row data-aos="fade-up" data-aos-offset="-300">
        <v-col class="text-center">
          Code: {{lobby.code}}
        </v-col>
      </v-row>
    </div>
    <!--GAME-->
    <component 
    v-else 
    ref="gameRef"
    :is="lobby.gameMode.component"
    @resetLobby="resetLobby"></component>

  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { CharacterGenerator, GameMode, KeyDestroyer } from "@/components";
import { DB } from "@/services";
import GameModes from "@/resources/GameModes"
import { StringGenerators } from "@/resources/StringHelper";
import Character from "@/models";

  export default {
    name: 'Lobby',

    components:{
      CharacterGenerator,
      GameMode,
      KeyDestroyer
    },

    data: () => ({
      gameModes: null,
      gameStarted: false
    }),
    computed:{      
      ...mapState("lobby", ["lobby", "selectedMode"]),
      ...mapState("character", ["characterFeatures", "characterName", "characterId"]),
      lobbyContClass(){
        let _class = "";
        if(this.lobby.hasStarted){
          _class = "opacity-0";
        }
        return _class;
      },
      isHost(){
        return this.lobby.hostId == this.characterId;
      }
    },
    methods: {
      ...mapActions("lobby", ["SetLobby", "SetSelectedMode"]),
      onBeforeUnloadHandler(ev){
        if(ev){    
          this.disconnect();
        }
      },
      UpdateLobbyState(doc){
        try{
          this.SetLobby(doc.data());
          if(this.lobby.hasStarted ?? false){
            setTimeout(() => {
              this.gameStarted = true;
            }, 500);
          }
          if(this.lobby.gameConfig.winnerId && this.lobby.gameConfig.winnerId != this.characterId){
            this.$refs.gameRef.lose();
          }
        }
        catch(e){
          this.disconnect();
        }
      },
      disconnect(){        
        this.lobby.characters = this.lobby.characters.filter(char => char.id != this.characterId);
        if(this.lobby.characters.length > 0){
          if(this.isHost){
            this.lobby.hostId = this.lobby.characters[0].id;
          }  
          DB.LobbyService.UpdateLobby(this.lobby.code, this.lobby);   
        }
        else{
          DB.LobbyService.DeleteLobby(this.lobby.code);          
        } 
      },
      startGame(){
        this.lobby.hasStarted = true;
        this.lobby.gameMode = this.selectedMode;
        this.lobby.characters.forEach(char => char.score = 0);
        switch (this.selectedMode.name) {
          case "Key Destroyer":
            this.lobby.gameConfig = {
              keyArray: StringGenerators.generateRandomScoredLetters(
                  this.selectedMode.options.maxScore.selected, 
                  this.selectedMode.options.minKeyCount.selected, 
                  this.selectedMode.options.maxKeyCount.selected
                ),
              maxScore: this.selectedMode.options.maxScore.selected
            }
            break;
        }
        DB.LobbyService.UpdateLobby(this.lobby.code, this.lobby);     
        setTimeout(() => {
          this.gameStarted = true;
        }, 750);        
      },
      resetLobby(){        
        this.lobby.gameConfig = {};
        this.lobby.gameMode = {};
        this.lobby.characters.forEach(char => char.score = 0);
        this.gameStarted = false;
        this.lobby.hasStarted = false;
      }
    },
    mounted(){
      try{
        DB.Hooks.OnSnapshot(this.UpdateLobbyState, this.lobby.code);
        addEventListener("beforeunload", this.onBeforeUnloadHandler);
        addEventListener("popstate", this.onBeforeUnloadHandler);    
        this.gameModes = GameModes;
        if(!this.selectedGameMode && this.isHost){
          this.SetSelectedMode(this.gameModes[0]);
        }
      }
      catch(ex){
        this.$router.push({path: '/'});
      }
    }
  }
</script>

<style lang="less">
 @import (less) "../styles/views/Home.less";
 @import (less) "../styles/views/Lobby.less";
</style>
