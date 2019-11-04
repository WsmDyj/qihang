import request from '@/utils/request'
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