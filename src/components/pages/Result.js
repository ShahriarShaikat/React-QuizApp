import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const { loading, error, answers } = useAnswers(id);
  const location = useLocation();
  const { state } = location;

  function calculateScore() {
    let score = 0;
    let corrected = 0;
    answers.forEach((question, qsIndex) => {
      let quizArr = [];
      let answerArr = [];
      question.options.forEach((option, opIndex) => {
        if (option.correct) {
          answerArr.push(opIndex);
        }
        if (state[qsIndex].options[opIndex].checked) {
          quizArr.push(opIndex);
          option.checked = true;
        }
      });
      if (_.isEqual(quizArr, answerArr)) {
        score += 5;
        corrected++;
      }
    });
    return { score, corrected };
  }

  const { score, corrected } = calculateScore();

  return (
    <>
      {loading && <div>{`Loading...`}</div>}
      {error && <div>{`There is an error`}</div>}
      {!loading && !error && (
        <>
          <Summary score={score} total={state.length} />
          {console.log(answers)}
          <Analysis corrected={corrected} analysis={answers} />
        </>
      )}
    </>
  );
}
