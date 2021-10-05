import React from "react";
import { ReactTerminal } from "react-terminal";
import Axios from "axios";

export default function Parrot() {
  const handleCmd = async (cmd: string) => {
    const res = await Axios.post("/parrot/cmd", { cmd });
    console.log(res);
    return res.data[1];
  };

  const commands = {
    p: handleCmd,
  };

  return (
    <div id="parrot">
      <ReactTerminal commands={commands} />
    </div>
  );
}
