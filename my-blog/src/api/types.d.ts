/*
* 文章
*/
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
/*
* 用户信息
*/
export interface IUserInfo {
  avatar: string
  autograph: string
  company: string
  job: string
  nickname: string
  username?: string
}
/*
* 评论信息
*/
export interface IComment {
  article_id: number
  comment_author: string
  comment_conent: string
  comment_likes: number
  comment_time: string
  comment_id: string
  userInfo?: IUserInfo
}
