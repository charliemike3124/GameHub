<template>
  <v-container class="game-container game-container-sm p-rel">
    <!--Logo-->
    <v-row justify="center" class="text-center my-5"  data-aos="fade-up">    
      <v-col>
        LOGO
      </v-col>
    </v-row>
    <!--Char Creation-->
    <v-row justify="center" class="mt-4"  data-aos="fade-up"  data-aos-delay="300">    
        <CharacterCreator>
        </CharacterCreator>
    </v-row>
    <!--Actions-->
    <v-row justify="center" class="pa-2 home-container"  data-aos="fade-up"  data-aos-delay="600">
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
          <v-col cols="12" align="center">
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
            :disabled="!!joinLobbyButtonDisabled"
            >
            Join Lobby
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" style="height: 50px;">
          <v-col class="input-max-width" v-show="gettingLobby">
              <v-progress-linear
              indeterminate
              color="white"
              ></v-progress-linear>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!--Footer-->
    <v-row  class="footer" justify="center" data-aos="fade-up"  data-aos-delay="900" data-aos-offset="-300">
      <v-col class="text-center">
        <a class="mx-2" href="https://www.linkedin.com/in/cvillalobosgtz/" target="_blank"><i class="mdi mdi-linkedin"></i></a>
        <v-divider vertical/>
        <a class="mx-2" @click.stop="showContactForm=true">Contact</a>
      </v-col>
    </v-row>
    <!--Activated-->
    <v-dialog
      max-width="450"
      :scrollable="false"
      v-model="showContactForm"
    > 
      <ContactForm 
      :recipient="'charliewebdev.contact@gmail.com'"
      @cancelContact="showContactForm=false"/>
    </v-dialog>
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
import { CharacterCreator, ContactForm } from "@/components";
import { StringGenerators } from "@/resources/StringHelper";
import {  mapActions, mapState} from "vuex";

export default {
  name: 'Home',
  
  components: {
    CharacterCreator,
    ContactForm
  },

  computed: {
    ...mapState("lobby", ["gettingLobby", "lobby"]),
    ...mapState("character", ["characterFeatures", "characterName"]),
    joinLobbyButtonDisabled(){
      return !!this.lobbyCode.match(/[^A-Za-z0-9]+/g) || this.lobbyCode.length !== 7 || this.lobby != null;
    }
  },

  data: () => ({
    lobbyCode: "",
    modeName: ["Key Destroyer"],
    showSnackbar: false,
    showContactForm: false,
  }),

  methods:{
    ...mapActions("lobby", ["GetLobby", "CreateLobby", "SetCharacterId", "SetLobby"]),
    
    async createLobby(){
      let code = StringGenerators.generateCode(7).toUpperCase();
      let id = StringGenerators.generateCode(12);
      let character = await Character.Character(this.characterName, this.characterFeatures, id);
      let lobby = {
        code: code,
        characters: [character],
        hostId: id,
        gameConfig: {}
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
    },
  },

  mounted(){
    this.$router.push({path: '/TestComponent'});
    setTimeout(() => {
      if(!!this.lobby)  this.SetLobby(null);
    }, 1000)
  }
}

</script>
<style lang="less">
 @import (less) "../styles/views/Home.less";
</style>

