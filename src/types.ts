// I am sorry for that
enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface Participant {
  uid: string;
  gender: Gender;
  name: string;
  twitterHandle: string;
  profilePicture: string; // URL
  ranking: string[]; // List of ids. Index 0 is the most preferrable
  likes: string[]; // Id of People they liked during one on ones
  currentRoomId?: string; // If this is not undefined, user is in that daily.co room. Otherwise not in a room
}
export interface Salon {
  joinId: string;
  pusherChannel: string;
  state: "WAITING_ROOM" | "GROUP" | "ONE_ON_ONE" | "END";
  participants: Participant[];
  rooms: Room[];
}
export interface Room {
  id: string; // Same as current roomId in the Participant interface
  action: string; // Bold text
  instruction: string; // Normal text next to action
  timer?: number; // Epoch of the timer. If undefined -> no timer
  activeSpeaker?: string; // uid of the active speaker
  nextPartOfSequenceButtonText?: string; // The label of the button. Can be "End speaker turn" or "Next question" or whatever. it goes to the next part of the game. If undefined there is no button!
}
enum Interrupt {
  NEXT_STATE = "NEXT_STATE",
}
export interface Interrupts {
  [key: string]: Interrupt[]; // key is the salon id
}

export interface SignupData {
  name?: string;
  gender?: string;
  twitterHandle?: string;
  salonId?: string;
}

export interface AppState {
  participants?: Participant[];
  userId?: string;
  salonId?: string | number;
  currentRoomId?: string;
  signupData?: SignupData;
  callFrame?: any;
  rooms?: Room[];
  state?: "WAITING_ROOM" | "GROUP" | "ONE_ON_ONE" | "END";
}
