import request from '@/utils/request'
import { IUserInfo } from './types'
interface author {
  username: string | (string | null)[]
}
export const login = (data: {username: string, password: string}) =>
  request({
    url: 'api/user/login',
    method: 'post',
    data
})

export const getUserInfo = (params?: author) =>
  request({
    url: 'api/user/getInfo',
    method: 'get',
    params
})

export const updateUserInfo = (data: IUserInfo) => 
  request({
    url: 'api/user/updateUser',
    method: 'post',
    data: data
  })