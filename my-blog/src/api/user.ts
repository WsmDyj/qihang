import request from '@/utils/request'
import { IUserInfo } from './types'

export const login = (data: {username: string, password: string}) =>
  request({
    url: 'api/user/login',
    method: 'post',
    data
})

export const getUserInfo = () =>
  request({
    url: 'api/user/getInfo',
    method: 'get',
})

export const updateUserInfo = (data: IUserInfo) => 
  request({
    url: 'api/user/updateUser',
    method: 'post',
    data: data
  })