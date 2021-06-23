<template>
  <div class="container">
        <div v-for="(x, i) in maze" :key="i" class="d-flex justify-center">
          <div v-for="(y, j) in x" :key="j" class="box" :style="boxStyle(y)">
          </div>
        </div>
  </div>
</template>

<script>

import GenerateMaze from "@/resources/MazeGenerator";
  export default {
    name: 'CastleDefense',

    data: () => ({
      maze: null
    }),

    methods: {
      boxStyle(cell){
        let style = "";
        if(cell.top) style += "border-top: 1px solid black;";
        if(cell.bottom) style += "border-bottom: 1px solid black;";
        if(cell.left) style += "border-left: 1px solid black;";
        if(cell.right) style += "border-right: 1px solid black;";
        return style;
      }
    },
    created(){      
      this.maze = GenerateMaze();
    }
  }
</script>

<style lang="less">
.box{
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  display: table-cell;
}
</style>
