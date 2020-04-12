import * as React from "react";

export interface SignupData {
  name?: string;
  gender?: string;
  twitterHandle?: string;
  salonId?: string;
}

interface Props {
  data: SignupData;
  setData: (data: SignupData) => any;
  join: () => any;
}

const Signup: React.FC<Props> = ({ data, setData, join }) => {
  const { name, gender, twitterHandle, salonId } = data;
  return (
    <div>
      <input
        value={name}
        onChange={(e) => setData({ name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={twitterHandle}
        onChange={(e) => setData({ twitterHandle: e.target.value })}
        placeholder="Twitter handle"
      />
      <select
        value={gender}
        onChange={(e) => setData({ gender: e.target.value })}
      >
        <option value="" disabled selected>
          Select your gender
        </option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>
      <input
        value={salonId}
        onChange={(e) => setData({ salonId: e.target.value })}
        placeholder="Salon ID"
      />
      <button onClick={join}>join</button>
    </div>
  );
};

export default Signup;
