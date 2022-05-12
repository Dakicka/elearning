import { useEffect, useState } from "react";
import { api, AppwriteClass } from "../api/api";
import { ClassCard } from "../components/Cards";

function Classes() {
  const [classes, setClasses] = useState<AppwriteClass[]>();

  useEffect(() => {
    api
      .getAllClasses()
      .then((res) => setClasses(res.documents))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="mx-5 py-5">
        <div className="grid grid-cols-2 gap-5 auto-rows-max">
          {classes &&
            classes.map((awClass) => {
              return (
                <div className="mx-auto" key={awClass.$id}>
                  <ClassCard awClass={awClass} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Classes;
