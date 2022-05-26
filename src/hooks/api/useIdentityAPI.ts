import useAxios from "../../utils/useAxios";
import { useMutation  } from "react-query"
import { Profile, User } from '../../models/User'
import { useEffect } from "react";
import {useQuery} from "react-query"

const useUserMutationAPI = <MutationData>() => {
  const apiClient = useAxios()

  const mutation = useMutation<User,unknown,MutationData,unknown>((UserMutationData)=>
    apiClient.put("/identity/me",UserMutationData,{ headers: {
      "Content-Type": "multipart/form-data"
    }})
  )
  
  useEffect(()=>{
    if(mutation.isSuccess){
      window.location.reload();
    }
  })
 
  return {update: mutation}
}

const useProfileFetchAPI = () => {

  const apiClient = useAxios()

  return useQuery(
    "profile",
    async () => {
      return await apiClient.get<Profile>("/identity/profile");
    },
    /* {
      onSuccess: (res) => {console.log(res)
      },
      onError: (err) => {console.log(err)
      },
    } */
  );

}

export {useUserMutationAPI, useProfileFetchAPI}