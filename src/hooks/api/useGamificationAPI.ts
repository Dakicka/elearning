import useAxios from "../../utils/useAxios";
import { useMutation, useQueryClient  } from "react-query"
import { useEffect } from "react";


const useWatchedLectureMutationAPI = <MutationData>() => {
  const apiClient = useAxios()
  const queryClient = useQueryClient()

  const mutation = useMutation<number,unknown,MutationData,unknown>((mutationData)=>
    apiClient.post("/gamification/watch",mutationData,)
  )

  useEffect(()=>{
    if(mutation.isSuccess){
      queryClient.invalidateQueries("profile")
      console.log("should been invalidated")
    }
  })
  

  return {save: mutation}
}

export {useWatchedLectureMutationAPI}