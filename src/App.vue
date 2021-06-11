<template>
  <v-app >
    <div class="app-container" >
      <div class="app-container-inside">
        <transition name="fade" mode="out-in">
          <router-view transition="fade-transition" />
        </transition>
      </div>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style lang="less">
</style>
