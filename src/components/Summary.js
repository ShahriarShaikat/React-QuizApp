import image from "../assets/images/success.png";
import classes from "../styles/summary.module.css";

export default function Summary({ total, score }) {
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br />
          {`${score} out of ${total * 5}`}
        </p>
      </div>

      <div className={classes.badge}>
        <img src={image} alt="Success" />
      </div>
    </div>
  );
}
