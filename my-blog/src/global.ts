export interface Qlist {
  id: number;
  name: string;
  path: string;
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