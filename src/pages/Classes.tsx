import { useEffect, useState } from "react";
import { api, AppwriteClass } from "../hooks/api/api";
import { CourseCard } from "../components/Cards";
import { useFetchCoursesAPI } from "../hooks/api/useCourseAPI";

function Classes() {
  const { data: courses } = useFetchCoursesAPI();

  return (
    <>
      <div className="mx-5 py-5">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 auto-rows-max">
          {courses &&
            courses.data.map((course) => {
              return (
                <div className="mx-auto" key={course.id}>
                  <CourseCard course={course} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Classes;
