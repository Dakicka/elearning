import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { api, AppwriteLecture } from "../api/api";
import { useAuth } from "../contexts/AuthContext";

function Lecture() {
  const { user } = useAuth();
  const { lectureId } = useParams<{ lectureId: string }>();
  const [lecture, setLecture] = useState<AppwriteLecture>();

  const onStart = () => {
    if (user && lectureId) {
      api.markAsWatched(lectureId, user?.$id);
    }
  };

  useEffect(() => {
    if (lectureId) {
      api
        .getLecture(lectureId)
        .then((res) => setLecture(res.documents[0]))
        .catch((err) => console.error(err));
    }
  }, [lectureId]);

  return (
    <>
      <p> Titel: {lecture?.title}</p>
      <p> Beschreibung: {lecture?.description}</p>
      <p> Ehrfahrungspunkte: {lecture?.exp}</p>
      <ReactPlayer
        url={lecture?.videoUrl}
        onProgress={(res) => console.log(res)}
        onStart={onStart}
      />
    </>
  );
}

export default Lecture;
