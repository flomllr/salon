import React from "react";
import "./App.css";
import Daily from "./Components/Daily";
import { observer } from "mobx-react";
import ApiService from "./services/ApiService";
import Pusher from "pusher-js";
import Signup, { SignupData } from "./Components/Signup";

import WaitingRoom from "./Container/WaitingRoom";
import VideoRoom, { Room } from "./Container/VideoRoom";

class App extends React.Component<any, any> {
  state = {
    participants: [],
    state: undefined,
    currentRoomId: undefined,
    userId: undefined,
    signupData: {},
    callFrame: undefined,
    rooms: [],
  };

  pusherSubscribe = (channelId: string) => {
    const pusher = new Pusher("9e2ab3e8d8eacf86ae5b", {
      cluster: "eu",
      forceTLS: true,
    });
    const channel = pusher.subscribe(channelId);
    channel.bind("STATE_UPDATE", this.handleUpdate);
  };

  handleUpdate = (state: any) => {
    console.log("Update", state);

    // Save current room id as separate value for quick access
    const { participants } = state;
    const { userId } = this.state;
    const { currentRoomId } = participants
      ? (participants.find((p: any) => p.uid === userId) as any)
      : [];

    this.setState({ ...state, currentRoomId });
  };

  join = async () => {
    const { name, gender, twitterHandle, salonId } = this.state
      .signupData as any;
    console.log("Joining", name, gender, twitterHandle, salonId);

    const { channelId, yourId: userId, currentState } = await ApiService.post(
      "join",
      {
        salonId,
        name,
        gender,
        twitterHandle,
      }
    );

    this.setState({ userId });
    this.pusherSubscribe(channelId);
    this.handleUpdate(currentState);
  };

  updateRanking = (ranking: string[]) => {};

  render() {
    const {
      state: salonState,
      participants,
      currentRoomId,
      signupData,
      rooms = [],
    } = this.state;
    console.log(salonState);

    const currentRoom = rooms.find((r) => (r as any).id === currentRoomId);
    return (
      <div className="App">
        <button
          onClick={() =>
            this.setState({ state: "GROUP", currentRoomId: "hello" })
          }
        >
          Join Hello
        </button>
        <button
          onClick={() =>
            this.setState({ state: "GROUP", currentRoomId: "world" })
          }
        >
          Join Hello
        </button>
        <button
          onClick={() =>
            this.setState({ state: undefined, currentRoomId: undefined })
          }
        >
          Leave
        </button>
        {salonState === "WAITING_ROOM" && (
          <WaitingRoom participants={participants} />
        )}
        {salonState === "GROUP" && currentRoom && (
          <VideoRoom
            room={currentRoom}
            registerCallFrame={(callFrame: any) => this.setState({ callFrame })}
          />
        )}
        {salonState === "ONE_ON_ONE" && currentRoom && (
          <VideoRoom
            room={currentRoom}
            registerCallFrame={(callFrame: any) => this.setState({ callFrame })}
          />
        )}
        {!salonState && (
          <Signup
            data={signupData}
            setData={(newData: SignupData) =>
              this.setState({ signupData: { ...signupData, ...newData } })
            }
            join={this.join}
          />
        )}
      </div>
    );
  }
}

export default observer(App);
