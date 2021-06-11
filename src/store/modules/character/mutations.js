import { MutationsHelper } from "@/store/helper";

export default {
    setCharacterFeatures: MutationsHelper.set("characterFeatures"), 
    setCharacterName: MutationsHelper.set("characterName"), 
    setCharacterId: MutationsHelper.set("characterId"), 
}