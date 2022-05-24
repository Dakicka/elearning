import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { api, AppwriteLecture } from "../hooks/api/api";
import { SpinnerGreenSmall } from "../components/Spinner";
import { useAuth } from "../contexts/AuthContext";

function Lecture() {
  const { user } = useAuth();
  const { lectureId } = useParams<{ lectureId: string }>();
  const [lecture, setLecture] = useState<AppwriteLecture>();
  const [isLoading, setIsLoading] = useState(true);

  const onStart = () => {
    if (user && lectureId && lecture) {
      // TODO: Mark as watched
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
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <ReactPlayer
          style={{ position: "absolute", top: 0, left: 0 }}
          url={lecture?.videoUrl}
          onProgress={(res) => console.log(res)}
          onStart={onStart}
          width="100%"
          height="100%"
          onReady={() => setIsLoading(false)}
        />
      </div>
      {isLoading ? (
        <SpinnerGreenSmall />
      ) : (
        <div className="bg-black px-5 py-5">
          <p className="text-center font-bold text-xl">
            {lecture?.title}{" "}
            <div className="badge badge-primary">{lecture?.exp} XP</div>
          </p>
          <br />

          <p> {lecture?.description}</p>
        </div>
      )}
    </>
  );
}

export default Lecture;
