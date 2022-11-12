import classes from "../styles/answers.module.css";
import Checkbox from "./Checkbox";

export default function Answers({ options = [], handleChange, analysis }) {
  return (
    <div className={classes.answers}>
      {options.map((option, index) =>
        analysis ? (
          <Checkbox
            key={index}
            className={`${classes.answer} ${
              option.correct
                ? option.checked
                  ? classes.correct
                  : classes.wrong
                : option.checked
                ? classes.wrong
                : null
            }`}
            indicator={
              option.correct ? "done" : option.checked ? "close" : null
            }
            text={option.title}
            defaultChecked={option.checked}
            disabled
          />
        ) : (
          <Checkbox
            key={index}
            className={classes.answer}
            text={option.title}
            value={index}
            checked={option.checked}
            onChange={(e) => handleChange(e, index)}
          />
        )
      )}
    </div>
  );
}
