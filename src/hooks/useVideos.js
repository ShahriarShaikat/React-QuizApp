import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

export default function useVideos(page) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasmore] = useState(true);

  useEffect(() => {
    async function getVideos() {
      const db = getDatabase();
      const videoRef = ref(db, "videos");
      const videoQuery = query(
        videoRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(8)
      );

      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(videoQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setVideos((prevState) => {
            return [...prevState, ...Object.values(snapshot.val())];
          });
        } else {
          setHasmore(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(true);
        setError(true);
      }
    }
    getVideos();
  }, [page]);

  return {
    loading,
    error,
    videos,
    hasMore,
  };
}
