<template>
  <div class="p-rel text-center">  
      <img width="250px" :src="require(`@/assets/${modes[0].url}`)"/>
      <div class="abs-center">
        <div class="mode-name"><span >{{modes[0].name}}</span></div>
      </div>
  </div>
</template>

<script>

  export default {
    name: 'GameMode',

    data: () => ({
      modes: [{
        name: "Key Destroyer",
        url:  "KeyDestroyerLogo.png"
      }]
    }),

    methods: {
    }
  }
</script>

<style lang="less">

.mode-name{
    position: relative;
    left: -50%;
}
</style>
