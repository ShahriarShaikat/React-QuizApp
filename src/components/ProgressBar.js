import { useRef, useState } from "react";
import classes from "../styles/progressbar.module.css";
export default function ProgressBar({ next, prev, percentange, submit }) {
  const tooltipRef = useRef();
  const [tooltip, setTooltip] = useState(false);

  function toggleTooltip() {
    if (tooltip) {
      tooltipRef.current.style.display = "none";
      setTooltip(false);
    } else {
      tooltipRef.current.style.left = `calc(${percentange}% - 65px)`;
      tooltipRef.current.style.display = "block";
      setTooltip(true);
    }
  }
  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {`${percentange}%`} Cimplete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${percentange}%` }}
            onMouseOver={toggleTooltip}
            onMouseLeave={toggleTooltip}
          ></div>
        </div>
      </div>
      <button
        className={`${classes.button} ${classes.next}`}
        onClick={percentange === 100 ? submit : next}
      >
        <span>{percentange === 100 ? "Submit" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </button>
    </div>
  );
}
