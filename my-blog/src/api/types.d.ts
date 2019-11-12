export interface IArticleData {
  article_id: number
  title: string
  content: string
  createtime: string
  author: string
  likeCount: number
  islike?: boolean
  markdown: string
}

export interface IUserInfo {
  avatar: string
  autograph: string
  company: string
  job: string
  nickname: string
}
