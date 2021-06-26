import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect,
} from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";
import io from "socket.io-client";
import { useEffect, useState, useRef, createContext } from "react";
import Home from "./Routes/Home";
import Room from "./Routes/Room";
import Create from "./Routes/Create";
import Join from "./Routes/Join";
import NotFound from "./Routes/404/NotFound";
import ErrorPage from "./Routes/404/ErrorPage";
import SocketContext from "./Context/socket";
import Session from "./Routes/Session";
import { useTransition, animated, config } from "react-spring";

let connect = io.connect("http://localhost:3001");
// let connect = io.connect("https://nomia-server.herokuapp.com/");

function App() {
  const socket = useRef(connect);
  const location = useLocation();

  const transitions = useTransition(location, {
    // from: { translateY: "-100%",},
    // enter: { translateY: "0%", },
    // leave: { translateY: "100%",},
    from: { translateY: "-100%", rotateZ: "5deg" },
    enter: { translateY: "0%", rotateZ: "0deg" },
    leave: { translateY: "100%", rotateZ: "5deg"},
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
            <Switch location={item}>
              <Route path="/session/:code">
                <Session />
              </Route>
              <Route path="/join/:code">
                <Join socket={socket} />
              </Route>
              {/* <Route path="/join" exact>
                <Join socket={socket} />
              </Route> */}
              <Route path="/room/:code" exact>
                <Room socket={socket} />
              </Route>
              <Route path="/create" exact>
                <Create socket={socket} />
              </Route>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/error">
                <ErrorPage />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </animated.div>
        ))}
      </SocketContext.Provider>
    </>
  );
}

export default App;
