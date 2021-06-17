<template>
  <v-container>
    <v-row style="height: 100px;">
      <v-col class="text-center">
        <div ><span :class="counterClass">{{counter || ""}}</span></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <div class="keys"><span >{{currentKey}}</span></div>
        <div v-if="gameStarted">
          <span >{{currentKeyScore}}/{{lobby.gameConfig.keyArray[this.currentKeyIndex].score}}</span>
          <span v-show="negativeScore > 0" class="neg-score">-{{negativeScore}}</span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <div v-if="gameStarted">
          <span class="text-h4">Press as fast as you can!</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { DB } from "@/services";
  export default {
    name: 'KeyDestroyer',

    computed: {
      ...mapState("lobby", ["lobby"]),
      ...mapState("character", ["characterId"]),
    },

    data: () => ({
      gameStarted: false,
      counter: 5,
      counterInterval: null,
      counterClass: "kd-counter kd-counter-lg",
      currentKey: "",
      currentKeyIndex: 0,
      currentKeyScore: 0,
      negativeScore: 0,
    }),

    methods: {
      setCounterOff(){
        this.counter = 5;
        this.counterInterval = setInterval(() => {
          this.counter--;
          if(this.counter == 0){
            this.counter = "GO!";
            this.gameStarted = true;
            this.currentKey = this.lobby.gameConfig.keyArray[0].char;
          }
          else if (this.counter == "GO!"){
            this.counter = ""; 
            clearInterval(this.counterInterval);
          }
        }, 1000)
      },
      setNewKey(){
        this.currentKeyIndex++;
        this.currentKeyScore = 0;
        this.currentKey = this.lobby.gameConfig.keyArray[this.currentKeyIndex].char;
      },
      win(){
        this.gameStarted = false;
        this.currentKey = "You won!";
        this.lobby.gameConfig.winnerId = this.characterId;
        DB.LobbyService.UpdateLobby(this.lobby.code, this.lobby);    
        setTimeout(() => {
          this.$emit("resetLobby");            
        }, 3000);
      },
      lose(){
        this.gameStarted = false;
        this.currentKey = "You lost :(";
        setTimeout(() => {
          this.$emit("resetLobby");          
        }, 3000);
      },
      onKeyPress(ev){
        if(!this.gameStarted) return;
        if(ev.key.toUpperCase() == this.currentKey && this.negativeScore == 0){
          this.currentKeyScore++;
          if(this.currentKeyScore == this.lobby.gameConfig.keyArray[this.currentKeyIndex].score){
            let myChar = this.lobby.characters.find(char => char.id == this.characterId);
            myChar.score++;
            if(myChar.score == this.lobby.gameConfig.maxScore){ 
              this.win();
            }        
            else{
              this.setNewKey();
              DB.LobbyService.UpdateLobby(this.lobby.code, this.lobby);
            }
          }
          //play correct sound
        }
        else if(ev.key.toUpperCase() == this.currentKey && this.negativeScore > 0){
          this.negativeScore--;
          //play correct sound
        }
        else{
          this.negativeScore++;
          //play wrong sound
        }
      }
    },
    watch:{
      counter(){
        this.counterClass = "kd-counter";
        setTimeout(() => {
          this.counterClass = "kd-counter kd-counter-lg";          
        }, 150);
      },
      
    },
    created(){
      if(!this.gameStarted){        
        this.setCounterOff();
        document.addEventListener("keypress", this.onKeyPress)
      }
    }
  }
</script>

<style lang="less">
 @import (less) "../../styles/components/KeyDestroyer.less";
</style>
