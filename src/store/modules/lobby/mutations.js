import { MutationsHelper } from "@/store/helper";

export default {
    setLobby: MutationsHelper.set("lobby"), 
    setGettingLobby: MutationsHelper.set("gettingLobby"), 
    setCharacterId: MutationsHelper.set("characterId"), 
}