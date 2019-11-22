import request from '@/utils/request'
interface author {
  username: string | (string | null)[]
}

export const getfollow = (data: author) =>
  request({
    url: 'api/follow/following',
    method: 'post',
    data
  })

export const getunfollow = (data: author) =>
  request({
    url: 'api/follow/unfollow',
    method: 'post',
    data
  })

export const getfollowList = (params?: author) =>
  request({
    url: 'api/follow/list',
    method: 'get',
    params
  })