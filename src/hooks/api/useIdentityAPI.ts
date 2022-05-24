import useAxios from "../../utils/useAxios";


const useFetchUserAPI = () => {
    const apiClient = useAxios()
    return apiClient.get("identity/me")
}

export {useFetchUserAPI}