import classes from "../styles/question.module.css";
import Answer from "./Answers";

export default function Question({ analysis }) {
  return analysis.map((question, index) => (
    <div className={classes.question} key={index}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {question.title}
      </div>
      <Answer options={question.options} analysis={true} />
    </div>
  ));
}
