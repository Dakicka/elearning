import { LectureCard } from "../components/Cards";
import { useParams } from "react-router-dom";
import { useQueryCourseAPI } from "../hooks/api/useCourseAPI";

function Lectures() {
  const { courseId } = useParams<{ courseId: string }>();

  const { data: course } = useQueryCourseAPI(courseId ? courseId : "");

  return (
    <>
      <div className="mx-5 py-5">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 auto-rows-max">
          {course &&
            course.data.lectures.map((lecture) => {
              return (
                <div className="mx-auto" key={lecture.id}>
                  <LectureCard lecture={lecture} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Lectures;
