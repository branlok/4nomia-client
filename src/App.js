import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";
import io from "socket.io-client";
import { useEffect, useState, useRef, createContext } from "react";

//Routes
import Home from "./Routes/Home";
import Room from "./Routes/Room";
import Create from "./Routes/Create";
import Join from "./Routes/Join";
import NotFound from "./Routes/404/NotFound";
import ErrorPage from "./Routes/404/ErrorPage";
import SocketContext from "./Context/socket";
import Session from "./Routes/Session";
import { useTransition, animated, config } from "react-spring";

//Audio
import useSound from "use-sound";
import boxSounds1 from "./Sounds/BoxSound_1.mp3";
import startGameSound from "./Sounds/enter.mp3";
import Clown from "./Sounds/mr_clown.mp3";
import VolumeToggle from "./Components/VolumeToggle";

let connect = io.connect(process.env.REACT_APP_SERVER);
// let connect = io.connect("https://nomia-server.herokuapp.com/");

function App() {
  const socket = useRef(connect);
  const location = useLocation();
  console.log(location);
  
  //Audio
  const [rustle] = useSound(startGameSound, { volume: 0.5 });
  const [rustle2] = useSound(boxSounds1, { volume: 1 });
  const [gameTheme, { stop }] = useSound(Clown, { loop: true, volume: 0.5 });
  let [playing, setPlaying] = useState(false);

  //animation
  const transitions = useTransition(location, {
    from: {
      position: "absolute",
      width: "100%",
      translateY: "-100%",
      scale: location.pathname.match(/^\/session\//) ? "0" : "1",
      rotateZ: "5deg",
    },
    enter: { translateY: "0%", rotateZ: "0deg", scale: "1" },
    leave: { translateY: "100%", rotateZ: "5deg" },
    config: config.gentle,
    delay: 0,
    onStart: location.pathname.match(/^\/session\//) ? rustle : rustle2,
  });

  useEffect(() => {
    socket.current.on("err", (response) => {
      console.log(response)
    })
    return () => socket.current.off("err");
  })

  return (
    <>
      <GlobalStyle />
      <SocketContext.Provider value={socket.current}>
        {transitions((props, item) => (
          <animated.div style={props}>
            <VolumeToggle
              gameTheme={gameTheme}
              stop={stop}
              playing={playing}
              setPlaying={setPlaying}
            />
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
