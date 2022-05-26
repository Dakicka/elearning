import axios from 'axios'  
import { useContext } from 'react'
import { isTokenExpired, refreshTokens } from '../AuthProvider'
import { AuthContext } from '../contexts/AuthContext'
import { config } from './config'


const API_BASE_URL = config.apiBaseUrl

const useAxios = () => {
    const {authTokens, setAuthTokens} = useContext(AuthContext)

    const headers = {
        "Authorization": `Bearer ${authTokens?.accessToken}`,
        "Content-Type": "application/json"
    }
    const axiosClient = axios.create({
        baseURL: API_BASE_URL,
        headers
    })

    axiosClient.interceptors.request.use((async req => {
        if(authTokens){
            
            if (!isTokenExpired(authTokens?.accessToken)){
                return req
            }
            const newAuthTokens = await refreshTokens(authTokens.refreshToken)
            setAuthTokens(newAuthTokens)
            req.headers = {Authorization: `Bearer ${newAuthTokens?.accessToken}`}

            return req
        }
        
        
        return req
    }))

    return axiosClient
}

export default useAxios;