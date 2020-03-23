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
  date?: string
}
/*
* 文章
*/
export interface IArticleData {
  articleImg: string
  article_id: number
  author: string
  title: string
  content: string
  createtime: string
  likeCount: number
  comments: number
  reviews: number
  islike?: boolean
  markdown: string
  articleTag?: string[]
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
  showReply?: boolean
  comment_status?: number
}
/*
* 二级评论
*/
export interface IReply {
  reply_id: string
  avatar?: string
  nickname?: string
  job?: string
  comment_id?: string
  reply_author: string
  reply_conent: string
  reply_time?: string
  showReply?: boolean
}
/*
* 关注
*/
export interface IFollow {
  title: string
  data: []
  count: number
}
/*
* 标签
*/
export interface Itag {
  value: string
  laber: string
  disabled?: boolean
} 
/*
* 视频
*/
export interface IVideo {
  id: number
  title: string
  describe: string
  origin: string
  location: string
  imgUrl: string
}
/*
 * 问答 
 */
export interface IAskData {
  question_id: string
  title: string
  articleTag: Itag[]
  content: string
  markdown: string
}
/*
* 问答
*/
export interface Iquestion extends IAskData {
  author: any
  createtime: string
  likeCount: number
  comments: number
  reviews: number
  status: number
}