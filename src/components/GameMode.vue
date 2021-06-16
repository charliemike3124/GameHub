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
    },
    computed: {      
      ...mapState("lobby", ["selectedMode"]),
      selectedStyle(){
        let selectedStyle = "";
        let mode = GameMode.GameMode(this.name, this.url, this.desc);
        if(this.selectedMode.name == mode.name){
          selectedStyle = "background-color: #14ff3773;";
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

.wrapper{
  border: 4px solid #3022223f;
  border-radius: 6px;
  min-height: 150px;
  background-color: #ffffff21;
  transition: 0.2s;
  img{
    border: 3px solid rgba(255, 255, 255, 0.671);
    border-radius: 4px;
    width: 100%;
  }
  .mode-name{
    font-weight: 700;
    font-size: 1.1em;
  }
  .mode-desc{
    font-size: 0.95em;
  }
}
.wrapper:hover{    
  background-color: #ffffff52;
}
</style>
