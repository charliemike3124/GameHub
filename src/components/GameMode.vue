<template>
  <div class="p-rel">  
      <img width="65px" :src="require(`@/assets/${modes[0].url}`)"/>
      <div class="mode-name"><span >{{modes[0].name}}</span></div>
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

</style>
