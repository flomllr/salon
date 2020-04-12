import * as React from "react";
import { Logo } from "src/Components/Logo";

interface Props {
  mutualMatches: any;
}

export const End: React.FC<Props> = ({ mutualMatches }) => {
  if (mutualMatches.length === 0) {
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Logo>Salon</Logo>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>😢</h1>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>You did not get any matches...</h2>
          </div>
        </div>
      </div>
    );
  }
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Logo>Salon</Logo>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>
            You have {mutualMatches.length} {mutualMatches.length > 1 ? "matches" : "match"}
          </h3>
        </div>
        {mutualMatches.map((m) => (
          <div
            key={m.name}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <img style={{ borderRadius: "50%" }} src={m.profilePicture} width={50} />
            <label style={{ marginLeft: 10, fontSize: "1.1em" }}>
        You and {m.name} liked each other! Contact {m.gender === "MALE" ? 'him' : 'her'} on Twitter <strong>{m.twitterHandle}</strong>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
