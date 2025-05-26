import {axiosInstance} from '../plugins/axios'

export interface UserType {
  id: number
  type: string
}

export const createUserType = async (data: UserType) => {
  const response = await axiosInstance.post('/user/type', data)
  return response.data
}

export const getUserTypeById = async (id: number) => {
  const response = await axiosInstance.get(`/user/type/${id}`)
  return response.data
}

export const updateUserType = async (id: number, data: {type: string}) => {
  const response = await axiosInstance.patch(`/user/type/${id}`, data)
  return response.data
}

export const deleteUserType = async (id: number) => {
  const response = await axiosInstance.delete(`/user/type/${id}`)
  return response.data
}