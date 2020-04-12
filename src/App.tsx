import React from "react";
import "./App.css";
import Daily from "./Components/Daily";
import { observer } from "mobx-react";
import ApiService from "./services/ApiService";
import Pusher from "pusher-js";
import Signup from "./Components/Signup";
import { AppState, SignupData } from "./types";
import styled from "styled-components";

import WaitingRoom from "./Container/WaitingRoom";
import VideoRoom from "./Container/VideoRoom";
import { colors } from "./theme";

class App extends React.Component<any, AppState> {
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
    const { signupData } = this.state || {};
    const { name, gender, twitterHandle, salonId } = signupData || {};
    console.log("Joining", name, gender, twitterHandle, salonId);

    if (!gender) {
      this.showError("Please select a gender.");
      return;
    }
    if (!name) {
      this.showError("Please provide a name.");
      return;
    }
    if (!salonId) {
      this.showError("Please provide a salon ID.");
      return;
    }

    const {
      channelId,
      yourId: userId,
      currentState,
      error,
    } = await ApiService.post("join", {
      salonId,
      name,
      gender,
      twitterHandle,
    });

    if (error) {
      console.error("Error:", error);
      this.showError(error);
    } else {
      this.setState({ userId, salonId: channelId });
      this.pusherSubscribe(channelId);
      this.handleUpdate(currentState);
    }
  };

  updateRanking = async (newRanking: any[]) => {
    const { salonId, userId, participants } = this.state;
    // Optimistic update
    participants?.forEach((p) => {
      if (p.uid === userId) {
        p.ranking = newRanking;
      }
    });
    this.setState({ participants });
    const { error } = await ApiService.post("rpc", {
      salonId,
      userId,
      action: "UPDATE_RANKING",
      payload: newRanking,
    });
    if (error) {
      console.error("Error:", error);
      this.showError(error);
    }
  };

  onNextPartOfSequence = async () => {
    const { salonId, userId, currentRoomId } = this.state;
    const { error } = await ApiService.post("rpc", {
      salonId,
      userId,
      action: "NEXT_STATE",
      payload: currentRoomId,
    });
    if (error) {
      console.error("Error:", error);
      this.showError(error);
    }
  };

  showError = (error: string) => {
    this.setState({ error });
    setTimeout(() => {
      this.setState({ error: undefined });
    }, 3000);
  };

  render() {
    const {
      state: salonState,
      participants = [],
      currentRoomId,
      signupData = { name: "", gender: "", salonId: "", twitterHandle: "" },
      rooms = [],
      userId,
      error,
    } = this.state || {};
    console.log(salonState);

    const currentRoom = rooms.find((r) => (r as any).id === currentRoomId);
    return (
      <div className="App">
        {salonState === "WAITING_ROOM" && (
          <WaitingRoom
            participants={participants.filter((p) => p.uid !== userId)}
          />
        )}
        {salonState === "GROUP" && currentRoom && (
          <VideoRoom
            room={currentRoom}
            participants={participants}
            userId={userId}
            updateRanking={this.updateRanking}
            registerCallFrame={(callFrame: any) => this.setState({ callFrame })}
            onNextPartOfSequence={this.onNextPartOfSequence}
            mode={salonState}
          />
        )}
        {salonState === "ONE_ON_ONE" && currentRoom && (
          <VideoRoom
            room={currentRoom}
            participants={participants}
            userId={userId}
            updateRanking={this.updateRanking}
            registerCallFrame={(callFrame: any) => this.setState({ callFrame })}
            onNextPartOfSequence={this.onNextPartOfSequence}
            mode={salonState}
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
        {error && <Error id="errorBox">{error}</Error>}
      </div>
    );
  }
}

const Error = styled.div`
  position: fixed;
  background-color: ${colors.warning};
  padding: 10px;
  color: #fff;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 300ms ease;
  border-radius: 3px;
`;

export default observer(App);
