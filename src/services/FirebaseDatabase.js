import Firebase from '@/firebase.config';
const LOBBIES = Firebase.Database.collection('Lobbies');

const LobbyService = {
    CreateLobby(code, lobby){
        return LOBBIES.doc(code).set(lobby);
    },
    async GetLobby(code){
        const lobby = await LOBBIES.doc(code).get();
        return lobby.exists ? lobby.data() : null;
    },
    async UpdateLobby(code, lobby){
        return LOBBIES.doc(code).update(lobby);
    },
    async DeleteLobby(code){
        return LOBBIES.doc(code).delete();
    },
};

const Hooks = {
    OnSnapshot(Action, code){
       return LOBBIES.doc(code).onSnapshot(doc => {
        Action(doc);
      })

    }
}

export default {LobbyService, Hooks};