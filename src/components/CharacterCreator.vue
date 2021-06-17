<template>
  <div>
    <div class="avatar-container">
         <CharacterGenerator :features="features" :width="125" :height="125"/>
    </div>
    <div class="feat-container">
      <div class="mb-2 d-flex justify-center" :height="20">
        <v-text-field
          :label="'Ex: ' + randomLabel"
          class="input-max-width"
          solo
          :hide-details="true"
          v-model="name"
          :maxlength="12"
        ></v-text-field>
      </div>
      <div class="d-flex justify-space-between" v-for="feat in features" :key="feat.name">
        <div class="mt-1"><span class="av-feature-text">{{feat.name}}</span></div>
        <div>
          <v-btn icon color="white" @click="decreaseFeature(feat)"><v-icon>mdi-menu-left</v-icon></v-btn>
          {{feat.selected}}/{{feat.total}}
          <v-btn icon color="white" @click="increaseFeature(feat)"><v-icon>mdi-menu-right</v-icon></v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
export default {
  name: 'CharacterCreator',

  components:{
    CharacterGenerator: () => import("@/components/CharacterGenerator")
  },
  
  computed:{
    ...mapState("character", ["characterFeatures", "characterName"]),
  },
  data: () => ({
    name: "",
    randomLabel: "",
    defaultNames: ["Lord Juicy", "Slap God", "Seminem", "Bob", "Rick", "Morty", "Sauceman"],
    features: [
      {
        name: 'Skin Color',
        selected: 1,
        total: 15
      },
      {
        name: 'Eyes',
        selected: 1,
        total: 11
      },
      {
        name: 'Mouth',
        selected: 1,
        total: 9
      },
      {
        name: 'Accesory',
        selected: 1,
        total: 3
      },
    ]
  }),
  methods: {
    ...mapActions("character", ["SetCharacterFeatures", "SetCharacterName"]),
    randomName(){
      return this.defaultNames[Math.floor(Math.random() * this.defaultNames.length)];
    },
    increaseFeature(feat){
      if(feat.selected + 1 <= feat.total){
        this.features.find(e => e == feat).selected++;
      }
      else{
        this.features.find(e => e == feat).selected = 1;
      }
      this.SetCharacterFeatures(this.features);
    },
    decreaseFeature(feat){
      if(feat.selected - 1  > 0){
        this.features.find(e => e == feat).selected--;
      }
      else{
        this.features.find(e => e == feat).selected = feat.total;
      }
      this.SetCharacterFeatures(this.features);
    }
  },
  mounted(){
    if(!!this.characterFeatures){
      for(let i = 0; i < this.features.length; i++){
        this.features[i].selected = this.characterFeatures[i].selected;
      }
    }
    this.name = this.characterName != "" ? this.characterName : "";
    this.randomLabel = this.randomName();
  },
  watch:{
    name(newValue){
      this.SetCharacterName(newValue);
    }
  }
}
</script>

<style lang="less">
  @import (less) "../styles/components/CharacterCreator.less";
</style>
