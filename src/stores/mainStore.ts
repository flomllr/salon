import { observable, action } from "mobx";

const dailyUrl = "https://magicsalon.daily.co/"

export default class MainStore {
    @observable roomId: string | undefined;
    @observable callFrame: any;
    @observable userId: string | undefined;  

    pusher: any;
    channel: any;

    @action setRoom(room: string) {
        this.roomId = room;
        if(this.callFrame){
            this.callFrame.join({url: dailyUrl + room})
        }
    }

    @action setCallFrame(frame: any) {
        this.callFrame = frame;
        if(this.roomId){
            this.callFrame.join({url: dailyUrl + this.roomId})
        }
    }

    @action setUserId(userId: string) {
        this.userId = userId;
    }
}