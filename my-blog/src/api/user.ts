import request from '@/utils/request'
export const login = (data: any) =>
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