import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, AppwriteClass, AppwriteLecture } from "../hooks/api/api";
import { Course } from "../models/Course";

export const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const [classImage, setClassImage] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="card w-80 lg:w-96 bg-base-100 shadow-xl h-full">
      <figure>
        <img src={classImage} alt="class topic picture" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{course.title}</h2>
        <p>{course.description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary bg-primary hover:bg-secondary text-black"
            onClick={() => navigate(`/classes/${course.id}`)}
          >
            Jetzt Starten
          </button>
        </div>
      </div>
    </div>
  );
};

export const LectureCard: React.FC<{ awLecture: AppwriteLecture }> = ({
  awLecture,
}) => {
  const navigate = useNavigate();

  return (
    <div className="card w-80 lg:w-96 bg-base-100 shadow-xl h-full">
      <div className="card-body">
        <h2 className="card-title">{awLecture.title}</h2>
        <div className="badge badge-primary">{awLecture.exp} XP</div>
        <p>{awLecture.description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary bg-primary hover:bg-secondary text-black"
            onClick={() => navigate(`/lectures/${awLecture.$id}`)}
          >
            Jetzt Anschauen
          </button>
        </div>
      </div>
    </div>
  );
};
