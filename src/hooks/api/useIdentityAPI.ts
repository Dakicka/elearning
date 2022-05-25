import useAxios from "../../utils/useAxios";

const apiClient = useAxios()
import { useQuery  } from "react-query"
import {User} from '../../models/User'

const useUpdateUserAPI = () => {
    return useQuery(
        "me",
        async () => {
          return await apiClient.put<User>("identity/me")
        },
        {
          onSuccess: (res) => {console.log(res)
          },
          onError: (err) => {console.log(err)
          },
        }
      );
 

}

export {useUpdateUserAPI}