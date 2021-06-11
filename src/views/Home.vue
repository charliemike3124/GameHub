<template>
  <v-container class="game-container game-container-sm">
    <v-row justify="center" class="mt-4"  data-aos="fade-up">    
      <CharacterCreator>
      </CharacterCreator>
    </v-row>
    <v-row justify="center" class="pa-2 home-container mt-1"  data-aos="fade-up">
      <v-col lg="6" sm="8">
        <v-row>
          <v-col cols="12" align="center">
            <v-btn
            @click="createLobby"
            :disabled="!!lobby || characterName == ''"
            >
            Create Lobby
            </v-btn>
          </v-col>
          <v-col cols="12" align="center"  data-aos="fade-up"  data-aos-delay="300">
          <v-divider></v-divider>
            <v-text-field
              class="mt-6 mb-4 input-max-width"
              label="Ex: ABC123"
              solo
              v-model="lobbyCode"
              :hide-details="true"
              :maxlength="7"
            ></v-text-field>
            <v-btn
            @click="joinLobby"
            :disabled="!!loadLobbyButtonDisabled"
            >
            Join Lobby
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="input-max-width" v-show="gettingLobby">
          <v-progress-linear
          indeterminate
          color="white"
          ></v-progress-linear>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="showSnackbar"
      timeout="2000"
      max-width="50px"
      rounded
    >Lobby not found.</v-snackbar>
  </v-container>
</template>

<script>
import Character from "@/models";
import { CharacterCreator } from "@/components";
import { StringGenerators } from "@/resources/StringHelper";
import {mapActions, mapState} from "vuex";
import { DB } from "@/services";
export default {
  name: 'Home',
  
  components: {
    CharacterCreator
  },

  computed: {
    ...mapState("lobby", ["gettingLobby", "lobby"]),
    ...mapState("character", ["characterFeatures", "characterName"]),
    loadLobbyButtonDisabled(){
      return !!this.lobbyCode.match(/[^A-Za-z0-9]+/g) || this.lobbyCode.length !== 7 || !!this.lobby;
    }
  },

  data: () => ({
    lobbyCode: "",
    modeName: ["Key Destroyer"],
    showSnackbar: false
  }),

  methods:{
    ...mapActions("lobby", ["GetLobby", "CreateLobby", "SetCharacterId", "SetLobby"]),
    
    async createLobby(){
      let code = StringGenerators.generateCode(7).toUpperCase();
      let id = StringGenerators.generateCode(12);
      let character = await Character.Character(this.characterName, this.characterFeatures, id);
      let lobby = {
        code: code,
        characters: [character]
      }
      await this.CreateLobby(lobby);
      if(!!this.lobby) this.$router.push({path: 'Lobby'});
    },

    async joinLobby(){
      let id = StringGenerators.generateCode(12);
      let character = Character.Character(this.characterName, this.characterFeatures, id);
      let params = {
        character: character,
        code: this.lobbyCode.toUpperCase()
      }
      await this.GetLobby(params);      
      if(!!this.lobby){ 
        this.$router.push({path: 'Lobby'});
      }
      else{
        this.showSnackbar = true;
      }      
    }
  },

  mounted(){
    if(!!this.lobby){      
      this.lobby.characters = this.lobby.characters.filter(char => char.id != this.characterId);
      DB.LobbyService.UpdateLobby(this.lobby.code, this.lobby);
      this.SetLobby(null);
    }
  }
}
</script>
<style lang="less">
 @import (less) "../styles/views/Home.less";
</style>

