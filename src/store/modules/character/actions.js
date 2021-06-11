export default {
    SetCharacterFeatures({commit}, features){
        commit("setCharacterFeatures", features);
    },
    SetCharacterName({commit}, name){
        commit("setCharacterName", name);
    },
    SetCharacterId({commit}, id){
        commit("setCharacterId", id);
    }
}
