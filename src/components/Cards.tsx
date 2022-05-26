import { useNavigate } from "react-router-dom";
import { Course, Lecture } from "../models/Course";

export const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className="card w-80 lg:w-96 bg-base-100 shadow-xl h-full">
      <figure>
        <img
          className="w-full h-48"
          src={course.thumbnail}
          alt="class topic picture"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{course.title}</h2>
        <p>{course.description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary bg-primary hover:bg-secondary text-black"
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            Jetzt Starten
          </button>
        </div>
      </div>
    </div>
  );
};

export const LectureCard: React.FC<{ lecture: Lecture }> = ({ lecture }) => {
  const navigate = useNavigate();

  return (
    <div className="card w-80 lg:w-96 bg-base-100 shadow-xl h-full">
      <div className="card-body">
        <h2 className="card-title">{lecture.title}</h2>
        <div className="badge badge-primary">{lecture.xp} XP</div>
        <p>{lecture.description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary bg-primary hover:bg-secondary text-black"
            onClick={() => navigate(`/lectures/${lecture.id}`)}
          >
            Jetzt Anschauen
          </button>
        </div>
      </div>
    </div>
  );
};
