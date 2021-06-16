import { DB } from "@/services";

export default {
    async CreateLobby({commit, dispatch}, lobby){
        commit("setGettingLobby", true);
        await DB.LobbyService.CreateLobby(lobby.code, lobby);
        commit("setLobby", lobby);
        dispatch('character/SetCharacterId', lobby.characters[0].id, {root:true});
        commit("setGettingLobby", false);
    },
    async GetLobby({commit, dispatch}, params){    
        commit("setGettingLobby", true);
        let lobby = await DB.LobbyService.GetLobby(params.code);
        if(!!lobby){
            lobby.characters.push(params.character);
            dispatch('character/SetCharacterId', params.character.id, {root:true});
            DB.LobbyService.UpdateLobby(params.code, lobby)
            commit("setLobby", lobby);
        }
        commit("setGettingLobby", false);
    },
    async SetLobby({commit}, lobby){    
        commit("setLobby", lobby);
    },
    SetSelectedMode({commit}, mode){
        commit("setSelectedMode", mode);
    }
}