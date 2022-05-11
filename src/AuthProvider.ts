import { Models } from "appwrite"
import { api } from "./api/api"
import { User } from "./models/User"

export interface SignupForm {
  name: string
  email: string
  password: string
}

export interface LoginForm {
  email: string
  password: string
}

const localStorageKey = "cookieFallback"

const getToken = async () => {
  return window.localStorage.getItem(localStorageKey)
}

const handleUserResponse = ({ $id, name, registration, status, passwordUpdate, email, emailVerification }: User) => {
  return { $id, name, registration, status, passwordUpdate, email, emailVerification }
}
const handleSessionResponse = ({ $id,
  userId,
  expire,
  provider,
  providerUid,
  providerAccessToken,
  providerAccessTokenExpiry,
  providerRefreshToken,
  ip,
  osCode,
  osName,
  osVersion,
  clientType,
  clientCode,
  clientName,
  clientVersion,
  clientEngine,
  clientEngineVersion,
  deviceName,
  deviceBrand,
  deviceModel,
  countryCode,
  countryName,
  current }: Models.Session) => {
  return { $id,
    userId,
    expire,
    provider,
    providerUid,
    providerAccessToken,
    providerAccessTokenExpiry,
    providerRefreshToken,
    ip,
    osCode,
    osName,
    osVersion,
    clientType,
    clientCode,
    clientName,
    clientVersion,
    clientEngine,
    clientEngineVersion,
    deviceName,
    deviceBrand,
    deviceModel,
    countryCode,
    countryName,
    current }
}

const login = ({
  email,
  password,
}: LoginForm) => {
  return api.login(email, password).then(handleSessionResponse)
}
const signup = ({
  name,
  email,
  password,
}: SignupForm) => {
  return api.createAccount(email, password, name).then(
    handleUserResponse
  )
}

const logout = () => {
  api.deleteCurrentSession()
}

export {
  login,
  logout,
  signup,
  getToken
}
