import { Course, Lecture } from "../../models/Course";
import useAxios from "../../utils/useAxios";
import { useQuery, UseQueryResult  } from "react-query"
import {AxiosResponse} from "axios"



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
const useQueryCourseAPI = (courseId: string): UseQueryResult<AxiosResponse<Course>> => {
  const apiClient = useAxios()
    return useQuery(
        ["course", courseId],
        async () => {
          return await apiClient.get<Course>(`courses/${courseId}`);
        },
        /* {
          onSuccess: (res) => {console.log(res)
          },
          onError: (err) => {console.log(err)
          },
        } */
      );


}
const useQueryLectureAPI = (lectureId: string): UseQueryResult<AxiosResponse<Lecture>> => {
  const apiClient = useAxios()
    return useQuery(
        ["lecture", lectureId],
        async () => {
          return await apiClient.get<Lecture>(`courses/lectures/${lectureId}`);
        },
        /* {
          onSuccess: (res) => {console.log(res)
          },
          onError: (err) => {console.log(err)
          },
        } */
      );


}

export {useFetchCoursesAPI, useQueryCourseAPI, useQueryLectureAPI}