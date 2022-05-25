import { useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { SpinnerGreenSmall } from "../components/Spinner";
import { useAuth } from "../contexts/AuthContext";
import { useQueryLectureAPI } from "../hooks/api/useCourseAPI";

function Lecture() {
  const { user } = useAuth();
  const { lectureId } = useParams<{ lectureId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const { data } = useQueryLectureAPI(lectureId ? lectureId : "");
  const lecture = data?.data;

  const onStart = () => {
    if (user && lectureId && lecture) {
      // TODO: Mark as watched
    }
  };

  return (
    <>
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <ReactPlayer
          style={{ position: "absolute", top: 0, left: 0 }}
          url={lecture?.video_url}
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
            <span className="badge badge-primary">{lecture?.xp} XP</span>
          </p>

          <br />

          <p> {lecture?.description}</p>
        </div>
      )}
    </>
  );
}

export default Lecture;
