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
      <i class="mdi mdi-cog" @click="openSettings"></i>
      <div class="mode-name"><span >{{name}}</span></div>
      <div class="mode-desc"><span >{{desc}}</span></div>
    </v-col>

    <!--Options-->
    <v-dialog
      max-width="450"
      :scrollable="false"
      v-model="optionsOpened"
    > 
      <div 
      class="pa-8 options-modal">
        <v-row class="mb-1 fs-150 font-weight-bold">
          <v-col>
            <span> Options ({{selectedMode.name}})</span>
          </v-col>
        </v-row>
        <v-row v-for="(option,i) in selectedOptions" :key="i">
          <v-col sm="5" cols="6">
            <span class="font-weight-bold">{{option.name}}</span>
          </v-col>
          <v-col>
            <v-slider
              v-model="option.selected"
              :min="option.min"
              :max="option.max"
              step="1"
              :thumb-size="20"
              thumb-label="always"
              ticks
            ></v-slider>
          </v-col>
        </v-row>
        <v-row class="mt-1">
          <v-col>
            <v-btn @click="confirmSettings"> Confirm </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-dialog>
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
      component: {
        type: String,
        required: true
      },
      options: {
        type: Object,
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
      optionsOpened: false,
      selectedOptions: {}
    }),
    methods: {
      ...mapActions("lobby", ["SetLobby", "SetSelectedMode"]),
      selectMode(){
        let mode = GameMode.GameMode(this.name, this.url, this.desc, this.component,this.selectedOptions);
        this.SetSelectedMode(mode);
      },
      openSettings(){
        this.optionsOpened = true;
      },
      confirmSettings(){
        this.optionsOpened = false;
        this.selectMode();
      }
    },
    mounted(){
      this.selectedOptions = this.options;
    }
  }
</script>

<style lang="less">
 @import (less) "../styles/components/GameMode.less";
</style>
