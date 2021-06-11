<template>
  <div class="avatar" :style="{'width': width + 'px !important', 'height':height + 'px  !important'}">
    <div class="av">
        <img class="av" v-for="src in avatarSrc" :key="src" :src="src"/>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'CharacterGenerator',
    props:{
        features: {
            required: true,
            default: {}
        },
        width:{
          type: Number,
          required: false,
          default: ""
        },
        height:{
          type: Number,
          required: false,
          default: ""
        }
    },

    data: () => ({
    }),

    computed: {
        avatarSrc(){
            let skinSrc = require(`@/assets/skin${this.features[0].selected}.png`);
            let eyesSrc = require(`@/assets/eyes${this.features[1].selected}.png`);
            let mouthSrc = require(`@/assets/mouth${this.features[2].selected}.png`);
            let hatSrc = require(`@/assets/hat${this.features[3].selected}.png`);
            return [skinSrc, eyesSrc, mouthSrc, hatSrc];
        },
    }
  }
</script>

<style lang="less"> 
 @import (less) "../styles/components/CharacterCreator.less";
</style>
