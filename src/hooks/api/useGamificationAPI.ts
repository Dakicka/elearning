import useAxios from "../../utils/useAxios";
import { useMutation  } from "react-query"


const useWatchedLectureMutationAPI = <MutationData>() => {
  const apiClient = useAxios()

  const mutation = useMutation<number,unknown,MutationData,unknown>((mutationData)=>
    apiClient.post("/gamification/watch",mutationData,)
  )
  

  return {save: mutation}
}

export {useWatchedLectureMutationAPI}