import useAxios from "../../utils/useAxios";

import { useMutation  } from "react-query"
import {User} from '../../models/User'
import { useEffect } from "react";

const useUserMutationAPI = <MutationData>() => {
  const apiClient = useAxios()

  const mutation = useMutation<User,unknown,MutationData,unknown>((UserMutationData)=>
    apiClient.put("/identity/me",UserMutationData,{headers: {
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

export {useUserMutationAPI}