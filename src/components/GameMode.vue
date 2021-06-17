<template>
  <v-row 
    class="wrapper ma-2" 
    :style="selectedStyle"  
    justify="center" 
    @click="selectMode"
  >
    <v-col class="pa-2" cols="4">
          <img :src="require(`@/assets/${url}`)"/>
    </v-col>
    <v-col class="pa-2" cols="8">
      <i class="mdi mdi-cog settings"></i>
      <div class="mode-name"><span >{{name}}</span></div>
      <div class="mode-desc"><span >{{desc}}</span></div>
    </v-col>
  </v-row>
</template>

<script>

import { mapActions, mapState } from "vuex";
import GameMode from "@/models"
  export default {
    name: 'GameMode',
    props: {
      name: {
        type: String,
        required: true
      },
      desc: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      isHost: {
        type: Boolean,
        required: true,
        default: false
      },
    },
    computed: {      
      ...mapState("lobby", ["selectedMode"]),
      selectedStyle(){
        let selectedStyle = "";
        if(this.isHost){
          let mode = GameMode.GameMode(this.name, this.url, this.desc);
          if(this.selectedMode.name == mode.name){
            selectedStyle = "background-color: #14ff3773;";
          }
        }
        else{
          selectedStyle = "background-color: #17171721"
        }
        return selectedStyle;
      }
    },
    data: () => ({
    }),
    methods: {
      ...mapActions("lobby", ["SetLobby", "SetSelectedMode"]),
      selectMode(){
        let mode = GameMode.GameMode(this.name, this.url, this.desc);
        this.SetSelectedMode(mode);
      }
    }
  }
</script>

<style lang="less">
 @import (less) "../styles/components/GameMode.less";
</style>
