import classes from "../styles/analysis.module.css";
import Question from "./Question";

export default function Analysis({ analysis, corrected }) {
  return (
    <div className={classes.analysis}>
      <h1>Question Analysis</h1>
      <h4>{`You answerd ${corrected} out of ${analysis.length} questions correctly`}</h4>
      <Question analysis={analysis} />
    </div>
  );
}
