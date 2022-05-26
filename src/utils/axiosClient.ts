import axios from 'axios'  
import { getTokens, isTokenExpired, refreshTokens } from '../AuthProvider'
import { config } from './config'


const API_BASE_URL = config.apiBaseUrl
const authTokens = getTokens()

//const {authTokens, setAuthTokens} = useContext(AuthContext)
const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {Authorization: `Bearer ${authTokens?.accessToken}`}
})

axiosClient.interceptors.request.use((async req => {
    if(authTokens){
        
        if (!isTokenExpired(authTokens?.accessToken)){
            return req
        }
        const newAuthTokens = await refreshTokens(authTokens.refreshToken)

        req.headers = {Authorization: `Bearer ${newAuthTokens?.accessToken}`}
        console.log("refreshed the access token")
        return req
    }
    
    
    return req
}))

export default axiosClient


