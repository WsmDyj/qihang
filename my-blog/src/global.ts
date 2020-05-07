export interface Qlist {
  id: number;
  name: string;
  path: string;
}

export interface Qtag {
  value: string
  laber: string
  disabled?: boolean
} 

export const INFORMATION_LIST: Qlist[] = [
  { id: 0, name: "today", path: "/article?articleId=18u4gt2bddvk00" },
  { id: 1, name: "week", path: "/excellent" },
  { id: 2, name: "recommend", path: "/share" },
]

export const NAV_LIST: Qlist[]  = [
  { id: 0, name: "首页", path: "/" },
  { id: 1, name: "等你来答", path: "/questions" },
  // { id: 2, name: '阅读', path: '/hot' },
  { id: 3, name: "发现", path: "/share" },
]

export const TAG_LIST: Qtag[] = [
  { laber: "0", value: "全部" },
  { value: "Vue", laber: "1" },
  { value: "React", laber: "2" },
  { value: "JavaScript", laber: "3" },
  { value: "CSS", laber: "4" },
  { value: "Node", laber: "5" },
  { value: "Flutter", laber: "6" },
  { value: "Webpack", laber: "7" },
  { value: "TypeScript", laber: "8" },
  { value: "Http", laber: "9" },
  { value: "Docker", laber: "10" },
  { value: "性能优化", laber: "11" },
  { value: "微信小程序", laber: "12" },
]