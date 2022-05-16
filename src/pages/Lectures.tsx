import { useEffect, useState } from "react";
import { api, AppwriteLecture } from "../api/api";
import { LectureCard } from "../components/Cards";
import { useParams } from "react-router-dom";

function Lectures() {
  const [lectures, setLectures] = useState<AppwriteLecture[]>();
  const { classId } = useParams<{ classId: string }>();

  useEffect(() => {
    if (classId) {
      api
        .getLecturesForClass(classId)
        .then((res) => setLectures(res.documents))
        .catch((err) => console.error(err));
    }
  }, [classId]);

  return (
    <>
      <div className="mx-5 py-5">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 auto-rows-max">
          {lectures &&
            lectures.map((awLecture) => {
              return (
                <div className="mx-auto" key={awLecture.$id}>
                  <LectureCard awLecture={awLecture} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Lectures;
