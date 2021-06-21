import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";
import io from "socket.io-client";
import { useEffect, useState, useRef, createContext } from "react";
import Home from "./Routes/Home";
import Room from "./Routes/Room";
import Create from "./Routes/Create";
import Join from "./Routes/Join";
import SocketContext from "./Context/socket";
import Session from "./Routes/Session";
import { useTransition, animated, config } from "react-spring";

let connect = io.connect("http://localhost:3001");

function App() {
  const socket = useRef(connect);
  const location = useLocation();
  console.log(location);

  const transitions = useTransition(location, {
    from: { opacity: 1, translateY: "-100%", rotateZ: "20deg"},
    enter: { opacity: 1, translateY: "0%", rotateZ: "0deg" },
    leave: { opacity: 1, translateY: "100%", rotateZ: "20deg" },
    config: config.gentle,
  });

  return (
    <>
      <GlobalStyle />
      <SocketContext.Provider value={socket.current}>
        {transitions((props, item) => (
          <animated.div
            style={{
              ...props,
              position: "absolute",
              width: "100%",
            }}
          >
            <Switch>
              <Route path="/session/:code">
                <Session />
              </Route>
              <Route path="/join/:code">
                <Join socket={socket} />
              </Route>
              <Route path="/join" exact>
                <Join socket={socket} />
              </Route>
              <Route path="/room/:code" exact>
                <Room socket={socket} />
              </Route>
              <Route path="/create" exact>
                <Create socket={socket} />
              </Route>
              <Route path="/" exact>
                <Home />
              </Route>
            </Switch>
          </animated.div>
        ))}
      </SocketContext.Provider>
    </>
  );
}

export default App;
