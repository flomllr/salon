import React from 'react';
import './App.css';
import Daily from './Components/Daily'
import { observer } from 'mobx-react';
import MainStore from './stores/mainStore';
import ApiService from './services/ApiService';
import ControlService from './services/ControlService';
import Pusher from "pusher-js";

const mainStore = new MainStore();
ApiService.setMainStore(mainStore);
ControlService.setMainStore(mainStore);

class App extends React.Component<any,any> {
  state = {
    participants: [],
    state: undefined
  }

  pusherSubscribe = (channelId: string) => {
    const pusher = new Pusher("9e2ab3e8d8eacf86ae5b", {
      cluster: "eu",
      forceTLS: true
    })
    const channel = pusher.subscribe(channelId);
    channel.bind('STATE_UPDATE', this.handleUpdate);
  }

  handleUpdate = (state: any) => {
    console.log("Update", state)

    const { participants } = state;
    const me = participants.find((p: any) => p.uid = mainStore.userId);
    mainStore.setRoom(me.currentRoomId)
    this.setState(state)
  }

  join = async () => {
    const name: any = document.getElementById('name');
    const gender: any = document.getElementById('gender');
    const twitterHandle: any = document.getElementById('twitterHandle');
    const salonId: any = document.getElementById('salonId');
    const { channelId, yourId, currentState } = await ApiService.post('join', {
      "salonId": salonId.value,
      "name": name.value,
      "gender": gender.value,
      "twitterHandle": twitterHandle.value
    })

    this.pusherSubscribe(channelId)
    mainStore.setUserId(yourId)
    this.handleUpdate(currentState)
  }

  render() {
    const { state: salonState, participants } = this.state;
    return (
      <div className="App">
        {
          salonState === "WAITING_ROOM" 
          ? <p>Waiting room with {participants.map((p: any) => p.name)}</p>
          : ((salonState === "GROUP" || salonState == "ONE_ON_ONE")
          ? <Daily />
          : <>
            <input id="name" placeholder="Name"/>
            <input id="gender" placeholder="Gender" />
            <input id="twitterHandle" placeholder="Twitter" />
            <input id="salonId" placeholder="Salon ID" />
            <button onClick={this.join}>Join</button>
            </>
          )
      }
      </div>
    );
  }
}

export default observer(App);





