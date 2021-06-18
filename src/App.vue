<template>
  <v-app >
    <div class="app-container" >
      <div class="app-container-bg">
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
a{
  color: var(--text-color) !important;
}
span{
    font-family: cursive !important;
}
.app-container{
    background: var(--main-color);
    background: radial-gradient(circle, var(--main-color) 0%, rgba(18,76,144,1) 100%);

    height: 100%;
    width: 100%;
  
    font-family: cursive !important;
    font-weight: 500 !important;
    color: var(--text-color) !important;

}
.app-container-bg{    
    background-repeat: repeat;
    background-size: 40px;
    flex-direction: row;
}
</style>
