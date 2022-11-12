import { useRef, useState } from "react";
import image from "../assets/images/3.jpg";
import classes from "../styles/miniplayer.module.css";

export default function MiniPlayer() {
  const [status, setStatus] = useState(false);
  const miniPlayerRef = useRef();
  function togglePlayer() {
    if (status) {
      miniPlayerRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    } else {
      miniPlayerRef.current.classList.remove(classes.floatingBtn);
      setStatus(true);
    }
  }
  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={miniPlayerRef}
      onClick={togglePlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        play_circle_filled
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={togglePlayer}
      >
        close
      </span>
      <img src={image} alt="miniplayer" />
      <p>#23 React Hooks Bangla - React useReducer hook Bangla</p>
    </div>
  );
}
