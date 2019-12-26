import request from '@/utils/request'

interface author {
  author?: string | (string | null)[]
  page?: number
}

// interface askId {
//   id: string | (string | null)[]
// }
export const getAskList = (params?: author) =>
request({
  url: 'api/question/list',
  method: 'get',
  params
})

export const detailAsk = (params: any) => 
  request({
    url:'api/question/detail',
    method: 'get',
    params
  })

export const createAsk = (data: any) => 
  request({
    url:'api/question/new',
    method: 'post',
    data
  })

export const updateAsk = (data: any) => {
    request({
      url: 'api/question/update',
      method: 'post',
      data
    })
  }