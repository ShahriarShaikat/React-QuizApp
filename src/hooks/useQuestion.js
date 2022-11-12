import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestion(videoID) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestions() {
      const db = getDatabase();
      const questionRef = ref(db, `quiz/${videoID}/questions`);
      const questionQuery = query(questionRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(questionQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setQuestions((prevState) => {
            return [...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(true);
        setError(true);
      }
    }
    getQuestions();
  }, [videoID]);

  return {
    loading,
    error,
    questions,
  };
}
