import { Course, Lecture } from "../../models/Course";
import useAxios from "../../utils/useAxios";
import { useQuery, UseQueryResult  } from "react-query"



const useFetchCoursesAPI = () => {
  const apiClient = useAxios()
    return useQuery(
        "courses",
        async () => {
          return await apiClient.get<Course[]>("courses");
        },
        /* {
          onSuccess: (res) => {console.log(res)
          },
          onError: (err) => {console.log(err)
          },
        } */
      );


}
const useQueryLecturesAPI = (courseId: string): UseQueryResult<Lecture[]> => {
  const apiClient = useAxios()
    return useQuery(
        ["course", courseId],
        async () => {
          return await apiClient.get<Lecture[]>(`courses/${courseId}`);
        },
        /* {
          onSuccess: (res) => {console.log(res)
          },
          onError: (err) => {console.log(err)
          },
        } */
      );


}

export {useFetchCoursesAPI, useQueryLecturesAPI}