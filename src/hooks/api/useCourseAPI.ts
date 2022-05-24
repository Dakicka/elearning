import { Course } from "../../models/Course";
import useAxios from "../../utils/useAxios";
import { useQuery  } from "react-query"


const useFetchCoursesAPI = () => {
    const apiClient = useAxios()

    return useQuery(
        "query-tutorials",
        async () => {
          return await apiClient.get<Course[]>("courses");
        },
        {
          onSuccess: (res) => {console.log(res)
          },
          onError: (err) => {console.log(err)
          },
        }
      );


}

export {useFetchCoursesAPI}