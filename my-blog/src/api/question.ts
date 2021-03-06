import request from '@/utils/request'

interface author {
  author?: string | (string | null)[]
  articleTag?: string
  page?: number
  status?: string | number
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

export const getAskListHot = () =>
  request({
    url: "api/question/hot",
    method: "get"
  });

export const getAnswerList = (params: author) =>
  request({
      url: "api/question/answerList",
      method: "get",
      params,
  });

export const detailAsk = (params: any) => 
  request({
    url:'api/question/detail',
    method: 'get',
    params
  })

export const deleteAsk = (params: any) =>
  request({
    url: "api/question/delete",
    method: "get",
    params,
  });

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