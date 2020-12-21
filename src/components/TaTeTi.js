import tmi from "tmi.js";
import { useState, useEffect, useRef } from "react";

const TaTeTi = () => {
  const [state, setState] = useState({});
  const player1 = useRef(null);
  const player2 = useRef(null);

  useEffect(() => {
    const client = new tmi.Client({
      options: { debug: true, messagesLogLevel: "info" },
      connection: {
        reconnect: true,
        secure: true,
      },
      channels: ["maquinaiterar"],
    });
    client.connect().catch(console.error);
    client.on("message", (channel, tags, message, self) => {
      if (self) return;

      const userName = tags["display-name"];

      if (message.startsWith("!newgame")) {
        player1.current = null;
        player2.current = null;
        setState({});
        return;
      }

      if (message.startsWith("!joinx") && !player1.current) {
        player1.current = {
          name: userName,
          piece: "X",
        };
        setState((prev) => ({
          ...prev,
          player1: player1.current,
        }));
        return;
      }

      if (message.startsWith("!joino") && !player2.current) {
        player2.current = {
          name: userName,
          piece: "O",
        };
        setState((prev) => ({
          ...prev,
          player2: player2.current,
        }));
        return;
      }

      if (message.startsWith("!dw")) {
        if (player1.current && player1.current.name === userName) {
          setState((prev) => ({
            ...prev,
            [message.split(" ")[1]]: player1.current.piece,
          }));
        }
        if (player2.current && player2.current.name === userName) {
          setState((prev) => ({
            ...prev,
            [message.split(" ")[1]]: player2.current.piece,
          }));
        }
        return;
      }
    });
  }, [setState]);

  const styleBox = {
    border: 1,
    borderStyle: "solid",
    borderColor: "#000",
    textAlign: "center",
    fontSize: 50,
    width: 120,
    height: 120,
  };

  const styleBoxNumbers = {
    textAlign: "center",
    fontSize: 30,
    width: 40,
    height: 40,
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 25 }}>
        {state.player1
          ? `Jugador ${state.player1.piece}: ${state.player1.name}`
          : "!joinx"}
      </div>
      <div style={{ fontSize: 25 }}>
        {state.player2
          ? `Jugador ${state.player2.piece}: ${state.player2.name}`
          : "!joino"}
      </div>
      <br />
      <table>
        <tr>
          <td style={styleBoxNumbers}></td>
          <td style={styleBoxNumbers}>1</td>
          <td style={styleBoxNumbers}>2</td>
          <td style={styleBoxNumbers}>3</td>
        </tr>
        <tr>
          <td style={styleBoxNumbers}>1</td>
          <td style={styleBox}>{state["11"]}</td>
          <td style={styleBox}>{state["12"]}</td>
          <td style={styleBox}>{state["13"]}</td>
        </tr>
        <tr>
          <td style={styleBoxNumbers}>2</td>
          <td style={styleBox}>{state["21"]}</td>
          <td style={styleBox}>{state["22"]}</td>
          <td style={styleBox}>{state["23"]}</td>
        </tr>
        <tr>
          <td style={styleBoxNumbers}>3</td>
          <td style={styleBox}>{state["31"]}</td>
          <td style={styleBox}>{state["32"]}</td>
          <td style={styleBox}>{state["33"]}</td>
        </tr>
      </table>
    </div>
  );
};

export default TaTeTi;
