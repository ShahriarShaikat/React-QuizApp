import Answers from "components/Answers";
import MiniPlayer from "components/MiniPlayer";
import ProgressBar from "components/ProgressBar";
import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";
import useQuestion from "../../hooks/useQuestion";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "readyQuestions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;

    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.quesId].options[action.answeIndex].checked =
        action.value;
      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestion(id);
  const { currentUser } = UseAuth();
  const { uid } = currentUser;
  const [current, setCurrent] = useState(0);
  const redirect = useNavigate();

  const [qna, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "readyQuestions",
      value: questions,
    });
  }, [questions]);

  const handleEvent = (e, index) => {
    dispatch({
      type: "answer",
      quesId: current,
      answeIndex: index,
      value: e.target.checked,
    });
  };

  function nextQues() {
    if (current + 1 < questions.length) {
      setCurrent((prevState) => prevState + 1);
    }
  }
  function prevQues() {
    if (current > 0 && current < questions.length) {
      setCurrent((prevState) => prevState - 1);
    }
  }

  async function submit() {
    const db = getDatabase();
    const answerRef = ref(db, `result/${uid}`);
    await set(answerRef, {
      [id]: qna,
    });
    // redirect({
    //   pathname: `/result/${id}`,
    //   state: { qna },
    // });
    redirect(`/result/${id}`, { state: qna });
  }

  const percentange =
    questions.length > 0 ? ((current + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>{`Loading...`}</div>}
      {error && <div>{`There is an error`}</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[current].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qna[current].options}
            handleChange={handleEvent}
            analysis={false}
          />
          <ProgressBar
            next={nextQues}
            prev={prevQues}
            submit={submit}
            percentange={percentange}
          />
          <MiniPlayer />
        </>
      )}
    </>
  );
}
