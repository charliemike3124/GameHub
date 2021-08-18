<template>
  <div class="container">
        <div>
          <div 
          v-for="(boardX, i) in board" 
          :key="i" 
          class="d-flex justify-center" data-aos="fade-up" data-aos-duration="1000">
            <div 
            v-for="(boardY, j) in boardX" 
            :key="j" 
            class="box" :style="boxStyle(board[i][j])">
            </div>
          </div>
        </div>
      
  </div>
</template>

<script>
export default {
  name: 'Template',

  data: () => ({
    board: [[]],
    width: 11,
    height: 11,
    currentSnakeDirection: 'up',
    futureSnakeDirection: 'up',
    playerPositions: [[7, 2]],
    enemyPositions: [[7, 8]]
  }),

  computed:{
  },

  methods: {
    initializeBoard(){
      for(let i = 0; i < this.width; i++){
        this.board.push([]);
        for(let j = 0; j < this.height; j++){
          this.board[i].push({
            foodOccupied: false,
            playerOccupied: false,
            enemyOccupied: false
          });                    
        }
      }
      this.board[this.enemyPositions[0][0, 0]][this.enemyPositions[0][0, 1]].enemyOccupied = true;
      this.board[this.playerPositions[0][0, 0]][this.playerPositions[0][0, 1]].playerOccupied = true;
      this.board[2][5].foodOccupied = true;
    },
    boardTick(){
      this.board[this.playerPositions[0]][this.playerPositions[1]].playerOccupied = false;
      let newPos = [0 , 0];   
      switch(this.futureSnakeDirection){
        case 'up':
          if(this.snakeDirection != 'down'){
            newPos = [this.playerPosition[0] - 1, this.playerPosition[1]]
            this.board[newPos[0]][newPos[1]].playerOccupied = true;
            this.playerPosition = [newPos[0], newPos[1]];
          }
          break;
        case 'right':
          if(this.snakeDirection != 'left'){
            newPos = [this.playerPosition[0], this.playerPosition[1] + 1]
            this.board[newPos[0]][newPos[1]].playerOccupied = true;
            this.playerPosition = [newPos[0], newPos[1]];
          }
          break;
        case 'down':
          if(this.snakeDirection != 'up'){
            newPos = [this.playerPosition[0] + 1, this.playerPosition[1]]
            this.board[newPos[0]][newPos[1]].playerOccupied = true;
            this.playerPosition = [newPos[0], newPos[1]];
          }
          break;
        case 'left':
          if(this.snakeDirection != 'right'){
            newPos = [this.playerPosition[0], this.playerPosition[1] - 1]
            this.board[newPos[0]][newPos[1]].playerOccupied = true;
            this.playerPosition = [newPos[0], newPos[1]];
          }
          break;
      }
    },
    eatFood(){
      switch(this.snakeDirection){
        case 'up':

          break;
        case 'right':
          break;
        case 'down':
          break;
        case 'left':
          break;
      }
    },
    
    boxStyle(cell){
      let style = "";
      if(cell.enemyOccupied){
        style = "background: red;"
      }
      else if(cell.playerOccupied){
        style = "background: blue;"
      }
      else if(cell.foodOccupied){
        style = "background: green;"
      }
      return style;
    },
    handleMovement(ev){
      switch(ev.key){
        case 'ArrowUp':
          this.futureSnakeDirection = 'up';
          break;
        case 'ArrowRight':
          this.futureSnakeDirection = 'right';
          break;
        case 'ArrowDown':
          this.futureSnakeDirection = 'down';
          break;
        case 'ArrowLeft':
          this.futureSnakeDirection = 'left';
          break;
      }

    }
  },

  mounted(){
    this.initializeBoard();
    window.setInterval( this.boardTick, 1000);
    window.addEventListener("keydown", this.handleMovement);
  }
}
</script>

<style lang="less">
 @import (less) "../../styles/components/Snake.less";

</style>
