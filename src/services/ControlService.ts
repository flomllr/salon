import MainStore from "src/stores/mainStore";

let _mainStore: MainStore;

const setMainStore = (mainStore: MainStore) => {
    _mainStore = mainStore;
}

const registerFrame = (frame: any) => {
    _mainStore.setCallFrame(frame);
}

const joinRoom = (room: string) => {
    _mainStore.setRoom(room)
}

export default {
    setMainStore,
    joinRoom,
    registerFrame
}