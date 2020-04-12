import * as React from "react";
import { SignupData } from "../types";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { Input } from "./TextInput";

interface Props {
  data?: SignupData;
  setData: (data: SignupData) => any;
  join: () => any;
}

const Signup: React.FC<Props> = ({ data, setData, join }) => {
  const { name, gender, twitterHandle, salonId } = data || {};
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
          <Logo>Salon</Logo>
        </div>
        <Input value={name} onChange={(e) => setData({ name: e.target.value })} placeholder="Name" />
        <Input
          value={twitterHandle}
          onChange={(e) => setData({ twitterHandle: e.target.value })}
          placeholder="Twitter handle"
        />
        <select value={gender} onChange={(e) => setData({ gender: e.target.value })}>
          <option value="" disabled>
            Please choose one of those options
          </option>
          <option value="MALE">I am a Man and I want to meet Women</option>
          <option value="FEMALE">I am a Woman and I want to meet Men</option>
        </select>
        <Input value={salonId} onChange={(e) => setData({ salonId: e.target.value })} placeholder="Salon ID" />
        <Button onClick={join}>join</Button>
      </div>
    </div>
  );
};

export default Signup;
